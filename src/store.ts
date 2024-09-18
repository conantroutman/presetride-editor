import { produce } from "immer";
import { merge } from "ts-deepmerge";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DeepPartial } from "./types";
import { PaintCategory, VinylCategory } from "./data";

// interface State {
//   AftermarketBodykit: number;
//   BodyPaint: string;
//   CollectionName: string;
//   Frontend: string;
//   HoodStyle: number;
//   IsCarbonfibreHood: boolean;
//   IsCarbonfibreRoofScoop: boolean;
//   IsCarbonfibreSpoiler: boolean;
//   IsDualRoofScoop: boolean;
//   IsOffsetRoofScoop: boolean;
//   MODEL: string;
//   Pvehicle: string;
//   RimBrand: string | null;
//   RimPaint: string | null;
//   RimSize: number | null;
//   RimStyle: number | null;
//   RoofScoopStyle: number;
//   SpoilerStyle: number;
//   SpoilerType: string;
//   VinylColor1: number;
//   VinylColor2: number;
//   VinylColor3: number;
//   VinylColor4: number;
//   VinylName: string;
//   WindowTintType: string;
// }

export type SpoilerCategory = "sport" | "tuner";

export type RoofScoopVariant = "normal" | "offset" | "dual";

export interface DecalState {
	white: boolean;
	style: string;
}

interface DecalDoorState {
	slot1?: DecalState;
	slot2?: DecalState;
	slot3?: DecalState;
	slot4?: DecalState;
	slot5?: DecalState;
	slot6?: DecalState;
}

export interface PresetRide {
	name: string;
	carModel: string;
	bodyKit: string;
	hood: {
		carbon: boolean;
		style: string;
	};
	spoiler: {
		carbon: boolean;
		category: SpoilerCategory;
		style: string;
	};
	roofScoop: {
		variant: RoofScoopVariant;
		carbon: boolean;
		style: string;
	};
	rims: {
		brand: string;
		style: string | null;
		size: number;
		paint: string | null;
	};
	paint: {
		category: PaintCategory;
		value: string;
	};
	vinyl?: {
		category: VinylCategory | null;
		style: string | null;
		color: {
			slot1: string;
			slot2: string;
			slot3: string;
		};
	};
	decals?: {
		frontWindshield?: DecalState;
		rearWindshield?: DecalState;
		doorL?: DecalDoorState;
		doorR?: DecalDoorState;
		quarterPanelL?: DecalState;
		quarterPanelR?: DecalState;
	};
	number?: {
		left: string | null;
		right: string | null;
	};
	windowTint: string;
}

interface State {
	active: string | null;
	setActive: (active: string) => void;
	presetRides: { [key: string]: PresetRide };
	addPresetRide: () => void;
	removePresetRide: (id: string) => void;
	updatePresetRide: (data: DeepPartial<PresetRide>) => void;
	getPresetRide: () => PresetRide | undefined;
}

export const useStore = create(
	devtools(
		persist<State>(
			(set, get) => ({
				active: null,
				setActive: (active) => set({ active }),
				presetRides: {},
				addPresetRide: () =>
					set(
						produce((state: State) => {
							const id = crypto.randomUUID();

							const data: PresetRide = {
								name: "PRESET_RIDE",
								carModel: "DB9",
								bodyKit: "0",
								hood: {
									carbon: false,
									style: "0",
								},
								spoiler: {
									carbon: false,
									category: "sport",
									style: "0",
								},
								roofScoop: {
									carbon: false,
									variant: "normal",
									style: "0",
								},
								rims: {
									brand: "STOCK",
									style: null,
									size: 17,
									paint: null,
								},
								paint: {
									category: "gloss",
									value: "GLOSS_L1_COLOR01",
								},
								windowTint: "stock",
							};

							state.presetRides[id] = data;
							state.active = id;
						})
					),
				removePresetRide: (id) => {
					set(
						produce((state: State) => {
							const index = Object.keys(state.presetRides).indexOf(id);

							delete state.presetRides[id];

							if (Object.values(state.presetRides).length > 0) {
								// Set active to index above or the only remaining index
								if (index === 0) {
									state.active = Object.keys(state.presetRides)[index];
								} else {
									state.active = Object.keys(state.presetRides)[index - 1];
								}
							} else {
								state.active = null;
							}
						})
					);
				},
				updatePresetRide: (data) =>
					set(
						produce((state: State) => {
							const id = state.active;
							if (id === null) {
								return {};
							}

							state.presetRides[id] = merge(state.presetRides[id], data) as PresetRide;
						})
					),
				getPresetRide: () => {
					const { active, presetRides } = get();

					if (active === null) {
						return undefined;
					}

					return presetRides[active];
				},
			}),
			{ name: "presetrides-store" }
		)
	)
);
