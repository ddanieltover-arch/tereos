/** Local copy of Natural Earth 110m countries (world-atlas). */
export const WORLD_MAP_GEO_URL = '/maps/countries-110m.json';

export const MAP_DIMENSIONS = {
  width: 960,
  height: 480,
  compactHeight: 420,
} as const;

export const MAP_PROJECTION = {
  scale: 165,
  compactScale: 145,
  center: [0, 0] as [number, number],
} as const;
