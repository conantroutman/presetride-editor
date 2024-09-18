import colors from "./colors.json";
import vinyls from "./vinyls.json";
import rims from "./rims.json";

export type PaintCategory = keyof typeof colors;

export type VinylCategory = keyof typeof vinyls;

export const rimBrands = rims.map(({ id, name }) => ({ id, name }));
export const rimStylesMap = new Map<(typeof rims)[number]["id"], (typeof rims)[number]["styles"]>(rims.map(({ id, styles }) => [id, styles]));
