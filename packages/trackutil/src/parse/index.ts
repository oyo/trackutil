import type { TrkPoint } from '../types.ts'
import { parseCSV } from './csv.ts'
import { parseGPX } from './gpx.ts'
import { parseKML } from './kml.ts'

const parserMap: Array<[RegExp, (data: string) => TrkPoint[][]]> = [
  [/^\s*(<\?xml[^>]*\?>)?\s*<gpx[^>]*>/, parseGPX],
  [/^\s*(<\?xml[^>]*\?>)?\s*<kml[^>]*>/, parseKML],
  [/^[^\n]*(,[^\n]+){2,10}\n/, parseCSV],
]

export const parse = (data: string): TrkPoint[][] =>
  parserMap.filter((p) => p[0].test(data))[0][1](data)
