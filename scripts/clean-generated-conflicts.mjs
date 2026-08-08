import { readdir, rm } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
let removed = 0;

const clean = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await clean(path);
      return;
    }
    if (!/\s\d+\.[^.]+$/.test(basename(path))) return;
    await rm(path, { force: true });
    removed += 1;
  }));
};

await clean(root);
if (removed > 0) console.log(`Removed ${removed} generated cloud-conflict file(s) from dist.`);
