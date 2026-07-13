# trackutil

Simple tool to process geolocation tracks like GPX and KML.

### Usage

Install library

```bash
npm i trackutil
```

Simplify track from command line

```bash
node -e "import t from 'trackutil';t()" - /path/to/track.gpx
```

Use in code

```javascript
import fs from 'fs'
import { parseGPX, formatGPX, getBBox, simplify } from 'trackutil'

const track = parseGPX(fs.readFileSync('/path/to/track.gpx'))
const simple = simplify(track)
console.log(`${track.length} -> ${simple.length}`)
const bbox = getBBox(simple)
console.log(bbox)
fs.writeFileSync('./simple.gpx', formatGPX(simple))
```
