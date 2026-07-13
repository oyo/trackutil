import type { BBox, Point, TrkPoint } from './types.ts'
import { formatGPX, parseGPX } from './parse/gpx.ts'
import { Line, getBBox, simplify } from './operations/index.ts'
import { main } from './scripts/simplify.ts'

export { formatGPX, parseGPX, getBBox, simplify, Line, type BBox, type Point, type TrkPoint }
export default main
