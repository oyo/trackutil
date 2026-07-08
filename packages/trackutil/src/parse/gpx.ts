import XMLParser from '@nodable/flexible-xml-parser'
import type { TrkPoint } from '../types.ts'

const parser = new XMLParser({
  skip: { declaration: true, attributes: false },
  attributes: { prefix: '' },
})
export const parseGPX = (gpxstring: string): TrkPoint[] =>
  parser.parse(gpxstring).gpx.trk.trkseg.trkpt

export const formatGPX = (points: TrkPoint[]): string => `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="tracklib"><trk><trkseg>
${points
  .map(
    (p) =>
      `<trkpt lat="${p.lat}" lon="${p.lon}">${p.ele ? `<ele>${p.ele}</ele>` : ''}${
        p.time ? `<time>${p.time}</time>` : ''
      }</trkpt>`,
  )
  .join('\n')}
</trkseg></trk></gpx>`
