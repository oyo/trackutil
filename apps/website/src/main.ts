import { getBBox, parse, simplify, type TrkPoint } from 'trackutil'
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
const input = await dropIn({
  //url: './2013-Sutomiscica-Sladana.csv',
  url: './2026-Portorosa-Simba.gpx',
})
//console.log(input.type)
const text = await input.text()
const tracks = parse(text)
console.log(tracks)
const output = simplify(tracks, 0.000005) as TrkPoint[][]
console.log(output)
const bbox = getBBox(output)
console.log(bbox)
mapp.classList.remove('hide')
map.fitBounds([
  [bbox.min.lat, bbox.min.lon],
  [bbox.max.lat, bbox.max.lon],
])
output.forEach((track) => {
  console.log(track)
  const line = track.map((p) => [p.lat, p.lon]) as LatLngExpression[]
  L.polyline(line).setStyle({ color: '#ffd000' }).addTo(map)
  //L.marker(line[0], { alt: 'start' }).addTo(map)
  L.marker(line[line.length - 1], { alt: 'end' }).addTo(map)
})
