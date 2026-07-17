import { expect, test } from 'vite-plus/test'
import { simplifyTrack } from '../src/operations/index.ts'

const samples = [
  {
    input: [
      { lon: 0, lat: 0 },
      { lon: 1, lat: 1.1 },
      { lon: 2, lat: 2 },
    ],
    output: [
      { lon: 0, lat: 0 },
      { lon: 2, lat: 2 },
    ],
  },
  {
    input: [
      { lon: 0, lat: 0 },
      { lon: 1, lat: 1.2 },
      { lon: 2, lat: 2 },
    ],
    output: [
      { lon: 0, lat: 0 },
      { lon: 1, lat: 1.2 },
      { lon: 2, lat: 2 },
    ],
  },
]

test('simplify', () => {
  expect(simplifyTrack(samples[0].input, 0.1)).toStrictEqual(samples[0].output)
  expect(simplifyTrack(samples[1].input, 0.1)).toStrictEqual(samples[1].output)
})
