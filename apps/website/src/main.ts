import { getBBox, parseGPX, simplify, type TrkPoint } from 'trackutil'
import { dropIn } from 'drop.that'
import L, { type LatLngExpression } from 'leaflet'
import './style.css'

const mapp = document.createElement('div')
mapp.className = 'map'
document.body.appendChild(mapp)
const map = L.map(mapp).setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map)
mapp.classList.add('hide')
const input = await (
  await dropIn({
    url: './track.gpx',
  })
).text()
mapp.classList.remove('hide')
const output = simplify(parseGPX(input), 0.000005) as TrkPoint[]
const bbox = getBBox(output)
map.fitBounds([
  [bbox.min.lat, bbox.min.lon],
  [bbox.max.lat, bbox.max.lon],
])
const line = output.map((p) => [p.lat, p.lon]) as LatLngExpression[]
L.polyline(line).addTo(map)
L.marker(line[0], { alt: 'start' }).addTo(map)
L.marker(line[line.length - 1], { alt: 'end' }).addTo(map)
