import XMLParser from '@nodable/flexible-xml-parser'
import type { TrkPoint } from '../types.ts'
import dayjs from 'dayjs'

const parser = new XMLParser({
  skip: { declaration: true, attributes: true },
  attributes: { prefix: '' },
})

export const parseKML = (kmlstring: string): TrkPoint[][] => {
  let trks = parser.parse(kmlstring).kml.Document.Placemark
  trks = (Array.isArray(trks) ? trks : [trks]).filter((pm) => pm.hasOwnProperty('LineString'))
  const tracks = trks.map((pm: any) =>
    pm.LineString.coordinates
      .split(/\s+/)
      .map((l: string) => l.split(',').map(Number))
      .map((c: number[]) => ({ lon: c[0], lat: c[1], ele: c[2] })),
  )
  // TODO: extract date from proprietary format. remove in future versions.
  const meta = trks
    .map((track: any) => parser.parse(track.description.replace(/<hr>/g, '<hr/>')))
    .map((desc: any) =>
      desc?.div?.table?.tr
        .slice(0, 2)
        .map((cell: any) =>
          dayjs(cell.td[1].replace('.', ':'), 'DD/MM/YY HH:mm').format('YYYY-MM-DDTHH:mm:ss'),
        ),
    )
  if (meta && meta.length === tracks.length) {
    tracks.forEach((track: TrkPoint[], i: number) => {
      track[0].time = meta[i][0]
      track[track.length - 1].time = meta[i][1]
    })
  }
  // end proprietary code
  return tracks
}

export const formatKMLTrack = (points: TrkPoint[]): string => `
<Placemark>
<LineString>
<coordinates>
${points.map((p) => `${p.lon},${p.lat},${p.ele ?? 0}`).join('\n')}
</coordinates>
</LineString>
</Placemark>
`

export const formatKML = (tracks: TrkPoint[][]): string => `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
${tracks.map(formatKMLTrack).join('')}
</Document>
</kml>`
