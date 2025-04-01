import { readFileSync, writeFileSync } from 'fs'
import { find } from 'lodash-es'
import { execSync } from 'node:child_process'
import { mkdirSync, copyFileSync } from 'node:fs'

const raw = JSON.parse(readFileSync('./preprocessed.json', 'utf8'))

const filenames = JSON.parse(readFileSync('./filenames.json', 'utf8'))

console.log(filenames)

const output = []

mkdirSync('./data', { recursive: true })
mkdirSync('../src/data', { recursive: true })
mkdirSync('../public/data', { recursive: true })

for (let item of raw) {
  if (item.board_x0020_choice?.Value == 'Live') {
    // find ()

    //download items:
    let it = {
      ID: item.ID,
      ShowFrom: item.ShowFrom,
      HideFrom: item.HideFrom,
      Source: find(filenames, { id: item.ID }).filename,
      // Source: `${find(filenames, { id: item.ID }).src}?download=true`,
    }
    output.push(it)
    console.log(`"${find(filenames, { id: item.ID }).src}?download=1"`)
    execSync(`wget -O ./data/${it.Source} "${find(filenames, { id: item.ID }).src}?download=1"`)
    copyFileSync(`./data/${it.Source}`, `../public/data/${it.Source}`)
  }
}
console.log(output)

writeFileSync('../src/data/data.json', JSON.stringify(output, null, 2))
