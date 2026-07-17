# trackutil

Simple lib to process, simplify and convert geolocation tracks.
Currently supported:

- GPX
- KML
- CSV (time,lon,lat,ele) - empty line separates tracks
  This lib will extract track coords for drawing linestrings on a map.
  All other information like waypoints is ignored.

### Usage

Install library

```bash
npm i trackutil
```

Use in code

```javascript
import fs from 'fs'
import { getBBox, parse, simplify } from 'trackutil'

const tracks = parse(fs.readFileSync('/path/to/track.gpx'))
console.log(`${tracks.length} tracks`)
const simple = simplify(tracks)
const bbox = getBBox(simple)
console.log(bbox)
fs.writeFileSync('./simple.csv', formatCSV(simple))
```

Merge and simplify tracks from command line

```bash
git checkout https://github.com/oyo/trackutil.git
cd trackutil
npm i
npm run simplify /path/to/tracks/
```
