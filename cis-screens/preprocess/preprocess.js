import { readFileSync, writeFileSync } from 'fs'
import { find } from 'lodash-es'
import { execSync } from 'node:child_process'
import { mkdirSync, copyFileSync } from 'node:fs'

const raw = JSON.parse(readFileSync('./preprocessed.json', 'utf8'))

// const filenames = JSON.parse(readFileSync('./filenames.json', 'utf8'))

console.log(raw)

const output = []

mkdirSync('./data', { recursive: true })
mkdirSync('../src/data', { recursive: true })
mkdirSync('../public/data', { recursive: true })

for (let item of raw) {
  if (item.Board == 'Live') {
    // find ()

    //download items:
    // let it = {
    //   ID: item.ID,
    //   ShowFrom: item.ShowFrom,
    //   HideFrom: item.HideFrom,
    //   Source: find(filenames, { id: item.ID }).filename,
    //   // Source: `${find(filenames, { id: item.ID }).src}?download=true`,
    // }
    output.push(item)
    console.log(`"${item.src}?download=1"`)
    execSync(`wget -O ./data/${item.filename} "${item.src}?download=1"`)
    copyFileSync(`./data/${item.filename}`, `../public/data/${item.filename}`)
  }
}
// console.log(output)

writeFileSync(
  '../src/data/data.json',
  JSON.stringify(
    {
      data: output,
      updatedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
)
