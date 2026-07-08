export interface Point {
  lon: number
  lat: number
}

export type BBox = {
  center: Point
  min: Point
  max: Point
}

export interface TrkPoint extends Point {
  time?: string
  ele?: number
  speed?: number
  sat?: number
}
