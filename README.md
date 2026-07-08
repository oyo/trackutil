# trackutil

Simple tool to process geolocation tracks like GPX and KML.

### Usage

```bash
vp install
cd packages/trackutil
vp run simplify <file.gpx> [<tolerance>]
vp run simplify samples/sample.gpx 0.000005
# output written to file.simple.gpx
```

### Development

```bash
# build library
cd packages/trackutil && vp pack

# run webapp
cd apps/website && vp run dev
```

### Dependencies

Ported Ramer-Douglas-Peucker implementation from https://github.com/seabre/simplify-geometry - thanks to the original authors.
