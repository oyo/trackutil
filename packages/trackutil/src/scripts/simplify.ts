import fs from 'fs'
import { globSync } from 'glob/raw'
import { simplify } from '../operations/index.ts'
import { parse } from '../parse/index.ts'
import { formatCSV } from '../parse/csv.ts'

const runSimplify = () => {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.log('usage:\n  vp run simplify <path> [<tolerance]>')
    process.exit(1)
  }
  const match = `${args[0]}*.{gpx,kml,csv}`
  const tolerance = args[1] ? Number(args[1]) : 0.000005
  const files = globSync(match).sort()
  console.log(files)
  const simple = files
    .map((filename) => {
      const tracks = parse(fs.readFileSync(filename).toString())
      return simplify(tracks, tolerance)
    })
    .flat(1)
  const outputName = `${args[0]}.simple.csv`
  fs.writeFileSync(outputName, formatCSV(simple))
  console.log(`output written to ${outputName}`)
}

runSimplify()
