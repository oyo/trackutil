import fs from 'fs'
import { formatGPX, parseGPX } from '../parse/gpx.ts'
import { simplify } from '../operations/index.ts'
import type { TrkPoint } from '../types.ts'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.log('usage:\n  vp run simplify <filename> [<tolerance]>')
  process.exit(1)
}
const filename = args[0]
const tolerance = args[1] ? Number(args[1]) : 0.000005
const gpxstring = fs.readFileSync(filename).toString()
const track = parseGPX(gpxstring)
const simple = simplify(track, tolerance) as TrkPoint[]
console.log(`${track.length} points ${filename}`)
const filenameSimple = filename.replace(/\.gpx$/, '') + '.simple.gpx'
fs.writeFileSync(filenameSimple, formatGPX(simple))
console.log(`${simple.length} points ${filenameSimple}`)
