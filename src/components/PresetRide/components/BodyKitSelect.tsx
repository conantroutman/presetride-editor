import { useStore } from "@/store";
import { vehiclesMap } from "@/vehicles";
import { Select } from "@mantine/core";
import React from "react";

export const BodyKitSelect = () => {
	const state = useStore((state) => state.getPresetRide());
	const updateState = useStore((state) => state.updatePresetRide);

	const numberOfBodyKits = state?.carModel ? vehiclesMap.get(state.carModel)?.numberOfBodyKits ?? 0 : 0;

	const options = [
		{
			label: "Stock",
			value: "0",
		},
		...new Array(numberOfBodyKits).fill(0).map((_, index) => ({
			label: `Body ${index + 1}`,
			value: `${index + 1}`,
		})),
	];

	return (
		<Select
			label="Style"
			data={options}
			value={state?.bodyKit ?? "0"}
			onChange={(value) => {
				if (value !== null) {
					updateState({ bodyKit: value });
				}
			}}
		/>
	);
};
