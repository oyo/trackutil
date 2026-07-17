// port from https://github.com/seabre/simplify-geometry

import type { BBox, Point } from '../types.ts'

const DEFAULT_TOLERANCE = 5e-6

export const simplifyTrack = (points: Point[], tolerance: number = DEFAULT_TOLERANCE): Point[] => {
  let dmax = 0
  let index = 0

  for (let i = 1; i <= points.length - 2; i++) {
    let d = new Line(points[0], points[points.length - 1]).perpendicularDistance(points[i])
    if (d > dmax) {
      index = i
      dmax = d
    }
  }

  let results
  if (dmax > tolerance) {
    const results_one = simplifyTrack(points.slice(0, index), tolerance)
    const results_two = simplifyTrack(points.slice(index, points.length), tolerance)
    results = results_one.concat(results_two)
  } else if (points.length > 1) {
    results = [points[0], points[points.length - 1]]
  } else {
    results = [points[0]]
  }

  return results
}

export const simplify = (tracks: Point[][], tolerance: number = DEFAULT_TOLERANCE): Point[][] =>
  tracks.map((track) => simplifyTrack(track, tolerance))

export const getBBoxTrack = (points: Point[]): BBox =>
  points.reduce(
    (a: BBox, p: Point) => {
      if (p.lon > a.max.lon) a.max.lon = p.lon
      if (p.lat > a.max.lat) a.max.lat = p.lat
      if (p.lon < a.min.lon) a.min.lon = p.lon
      if (p.lat < a.min.lat) a.min.lat = p.lat
      a.center.lon = (a.min.lon + a.max.lon) / 2
      a.center.lat = (a.min.lat + a.max.lat) / 2
      return a
    },
    {
      center: { lon: 0, lat: 0 },
      min: { lon: +Infinity, lat: +Infinity },
      max: { lon: -Infinity, lat: -Infinity },
    },
  )

export const getBBox = (tracks: Point[][]): BBox =>
  tracks.reduce(
    (a: BBox, t: Point[]) => {
      const tbbox = getBBoxTrack(t)
      if (tbbox.max.lon > a.max.lon) a.max.lon = tbbox.max.lon
      if (tbbox.max.lat > a.max.lat) a.max.lat = tbbox.max.lat
      if (tbbox.min.lon < a.min.lon) a.min.lon = tbbox.min.lon
      if (tbbox.min.lat < a.min.lat) a.min.lat = tbbox.min.lat
      a.center.lon = (a.min.lon + a.max.lon) / 2
      a.center.lat = (a.min.lat + a.max.lat) / 2
      return a
    },
    {
      center: { lon: 0, lat: 0 },
      min: { lon: +Infinity, lat: +Infinity },
      max: { lon: -Infinity, lat: -Infinity },
    },
  )

export class Line {
  p1: Point
  p2: Point

  constructor(p1: Point, p2: Point) {
    this.p1 = p1
    this.p2 = p2
  }

  rise(): number {
    return this.p2.lat - this.p1.lat
  }

  run(): number {
    return this.p2.lon - this.p1.lon
  }

  slope(): number {
    return this.rise() / this.run()
  }

  yIntercept(): number {
    return this.p1.lat - this.p1.lon * this.slope()
  }

  isVertical(): boolean {
    return !isFinite(this.slope())
  }

  isHorizontal(): boolean {
    return this.p1.lat === this.p2.lat
  }

  protected _perpendicularDistanceHorizontal(point: Point): number {
    return Math.abs(this.p1.lat - point.lat)
  }

  protected _perpendicularDistanceVertical(point: Point): number {
    return Math.abs(this.p1.lon - point.lon)
  }

  protected _perpendicularDistanceHasSlope(point: Point): number {
    const slope = this.slope()
    return (
      Math.abs(slope * point.lon - point.lat + this.yIntercept()) /
      Math.sqrt(Math.pow(slope, 2) + 1)
    )
  }

  perpendicularDistance(point: Point): number {
    if (this.isVertical()) {
      return this._perpendicularDistanceVertical(point)
    } else if (this.isHorizontal()) {
      return this._perpendicularDistanceHorizontal(point)
    }
    return this._perpendicularDistanceHasSlope(point)
  }
}
