import XMLParser from '@nodable/flexible-xml-parser'
import type { TrkPoint } from '../types.ts'

const parser = new XMLParser({
  skip: { declaration: true, attributes: false },
  attributes: { prefix: '' },
})

export const parseGPX = (gpxstring: string): TrkPoint[][] => {
  let trks = parser.parse(gpxstring).gpx.trk
  if (!Array.isArray(trks)) trks = [trks]
  return trks.map((trk: any) => trk.trkseg.trkpt)
}

export const formatGPXTrack = (points: TrkPoint[]): string => `
<trk><trkseg>
${points
  .map(
    (p) =>
      `<trkpt lon="${p.lon}" lat="${p.lat}">${p.ele ? `<ele>${p.ele}</ele>` : ''}${
        p.time ? `<time>${p.time}</time>` : ''
      }</trkpt>`,
  )
  .join('\n')}
</trkseg></trk>
`

export const formatGPX = (tracks: TrkPoint[][]): string => `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="tracklib">
${tracks.map(formatGPXTrack).join('')}
</gpx>`
