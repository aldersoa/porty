import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("public/media");
const outputRoot = path.resolve("public/media-blur");
const supported = /\.(?:gif|jpe?g|png|webp)$/i;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  }));
  return nested.flat();
}

const files = (await walk(sourceRoot)).filter((file) => supported.test(file));

await Promise.all(files.map(async (file) => {
  const relative = path.relative(sourceRoot, file).replace(supported, ".jpg");
  const output = path.join(outputRoot, relative);
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(file, { animated: false, failOn: "none" })
    .rotate()
    .resize({ width: 40, withoutEnlargement: true })
    .blur(0.8)
    .jpeg({ quality: 38, progressive: true })
    .toFile(output);
}));

console.log(`Generated ${files.length} blur-up previews in ${path.relative(process.cwd(), outputRoot)}.`);
