import type { TrkPoint } from '../types.ts'

export const parseCSV = (csvstring: string): TrkPoint[][] =>
  csvstring
    .trim()
    .split(/\n{2,}/)
    .map((track) =>
      track
        .split('\n')
        .map((line) => line.split(','))
        .map((val) => ({
          time: val[0] === '' ? undefined : val[0],
          lon: Number(val[1]),
          lat: Number(val[2]),
          ele: Number(val[3]),
        })),
    )

export const formatCSVTrack = (points: TrkPoint[]): string =>
  points.map((p) => `${p.time ?? ''},${p.lon},${p.lat},${p.ele ?? 0}`).join('\n')

export const formatCSV = (tracks: TrkPoint[][]): string => tracks.map(formatCSVTrack).join('\n\n')
