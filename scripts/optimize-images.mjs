/**
 * Build-time image pipeline for the static export.
 *
 * Source files live in `assets/images/` (kept out of `public/` so the raw
 * multi-megabyte originals are not published). For every source we emit
 * AVIF/WebP variants into `public/images/` plus a manifest that the rendering
 * components use to build srcset / sizes / dimensions.
 *
 * Run automatically via the `predev` and `prebuild` scripts.
 */

import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'assets', 'images');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'image-manifest.json');
const POSTS_PATH = path.join(ROOT, 'src', 'data', 'portfolio-posts.json');

const COVER_WIDTHS = [400, 800, 1200];
const AVATAR_WIDTHS = [64, 128, 256, 640];
const AVIF_QUALITY = 50;
const WEBP_QUALITY = 78;

const IMAGE_RE = /<img\b[^>]*\bsrc="([^"]+)"/gi;

function baseName(file) {
  return path.basename(file, path.extname(file));
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

/** Collect local image paths referenced by post content and CV content. */
async function collectReferencedImages() {
  const referenced = new Set();

  const posts = await readJson(POSTS_PATH);
  for (const post of posts) {
    if (typeof post.image === 'string') referenced.add(post.image);
    for (const locale of Object.values(post.locales ?? {})) {
      for (const match of (locale.content ?? '').matchAll(IMAGE_RE)) {
        const src = match[1].split('?')[0];
        if (src.startsWith('/')) referenced.add(src);
      }
    }
  }

  for (const locale of ['ru', 'en']) {
    for (const file of ['cv.json', 'portfolio.json']) {
      const filePath = path.join(ROOT, 'src', 'locales', locale, file);
      let raw;
      try {
        raw = await readFile(filePath, 'utf8');
      } catch {
        continue;
      }
      for (const match of raw.matchAll(IMAGE_RE)) {
        const src = match[1].split('?')[0];
        if (src.startsWith('/')) referenced.add(src);
      }
    }
  }

  return referenced;
}

function uniqueWidths(widths, sourceWidth) {
  return [...new Set(widths.map((width) => Math.min(width, sourceWidth)))].sort(
    (a, b) => a - b
  );
}

async function emitVariant(source, base, width, format) {
  const extension = format === 'avif' ? 'avif' : 'webp';
  const fileName = `${base}-${width}.${extension}`;
  const outputPath = path.join(OUTPUT_DIR, fileName);

  const pipeline = sharp(source).resize({ width, withoutEnlargement: true });
  if (format === 'avif') {
    pipeline.avif({ quality: AVIF_QUALITY, effort: 5 });
  } else {
    pipeline.webp({ quality: WEBP_QUALITY, effort: 5 });
  }
  await pipeline.toFile(outputPath);

  return `/images/${fileName}`;
}

async function emitOg(source, base) {
  const fileName = `${base}-og.jpg`;
  const outputPath = path.join(OUTPUT_DIR, fileName);
  await sharp(source)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);
  return `/images/${fileName}`;
}

async function emitDefaultOg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#09090b"/>
        <stop offset="1" stop-color="#18181b"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="80" y="210" width="96" height="6" rx="3" fill="#34d399"/>
    <text x="80" y="310" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#f4f4f5">Антон Молдаков</text>
    <text x="80" y="378" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="30" fill="#a1a1aa">CTO / Teamlead · Frontend &amp; Mobile</text>
    <text x="80" y="560" font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-size="24" fill="#71717a">moldakov-anton.ru</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUTPUT_DIR, 'og-default.jpg'));
}

async function emitBlur(source) {
  const buffer = await sharp(source)
    .resize({ width: 24 })
    .webp({ quality: 45 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function buildEntry({ source, base, widths, og }) {
  const metadata = await sharp(source).metadata();
  const sourceWidth = metadata.width ?? 0;
  const sourceHeight = metadata.height ?? 0;
  const effectiveWidths = uniqueWidths(widths, sourceWidth);

  const variants = { avif: [], webp: [] };
  for (const width of effectiveWidths) {
    variants.avif.push({
      width,
      url: await emitVariant(source, base, width, 'avif'),
    });
    variants.webp.push({
      width,
      url: await emitVariant(source, base, width, 'webp'),
    });
  }

  return {
    width: sourceWidth,
    height: sourceHeight,
    blur: await emitBlur(source),
    og: og ? await emitOg(source, base) : null,
    variants,
  };
}

async function runPool(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(runners);
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function main() {
  const startedAt = Date.now();

  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(SOURCE_DIR)).filter((file) =>
    /\.(png|jpe?g|webp)$/i.test(file)
  );
  const referenced = await collectReferencedImages();
  const referencedBases = new Set([...referenced].map(baseName));

  // Referenced images that have no source file are a content bug: fail loudly
  // so a broken <img> never ships.
  for (const src of referenced) {
    if (!files.some((file) => baseName(file) === baseName(src))) {
      throw new Error(
        `Image "${src}" is referenced by content but missing in assets/images/`
      );
    }
  }

  const manifest = {};
  const report = [];
  const unused = [];

  await runPool(files, 3, async (file) => {
    const source = path.join(SOURCE_DIR, file);
    const base = baseName(file);
    const logicalPath = `/${file}`;
    const isAvatar = /^avatar\b/i.test(base);
    const isReferenced = referencedBases.has(base);

    if (!isAvatar && !isReferenced) {
      unused.push(file);
      return;
    }

    const entry = await buildEntry({
      source,
      base,
      widths: isAvatar ? AVATAR_WIDTHS : COVER_WIDTHS,
      og: !isAvatar,
    });

    // Every post cover is also addressable by its logical source path, and
    // inline content images keep working through the same manifest key.
    manifest[logicalPath] = entry;

    const before = (await stat(source)).size;
    const largest = entry.variants.webp[entry.variants.webp.length - 1];
    const after = (
      await stat(path.join(ROOT, 'public', largest.url.replace(/^\//, '')))
    ).size;
    report.push({ file, before, after });
  });

  // Keep stable ordering so the manifest does not churn between runs.
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))
  );

  await emitDefaultOg();

  await writeFile(
    MANIFEST_PATH,
    `${JSON.stringify(sorted, null, 2)}\n`,
    'utf8'
  );

  for (const { file, before, after } of report.sort(
    (a, b) => b.before - a.before
  )) {
    const saved = Math.round((1 - after / before) * 100);
    console.log(
      `${file.padEnd(52)} ${formatKb(before)} → ${formatKb(after)} (-${saved}%, webp max width)`
    );
  }
  if (unused.length > 0) {
    console.log(`\nSkipped (not referenced): ${unused.join(', ')}`);
  }
  console.log(
    `\n${report.length} images optimized in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
