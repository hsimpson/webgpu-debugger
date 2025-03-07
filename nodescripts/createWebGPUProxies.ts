import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import * as webidl2 from 'webidl2';

async function getIdlText(idlPath: string): Promise<string> {
  return readFile(idlPath, 'utf-8');
}

async function main() {
  if (process.argv.length < 3) {
    console.error(`usage: ts-node ${path.basename(__filename)} <path-to-webgpu-idl>`);
    process.exit(1);
  }

  const idlText = await getIdlText(process.argv[2]);
  const idlAst = webidl2.parse(idlText);
  console.log(JSON.stringify(idlAst, null, 2));
}

void main();
