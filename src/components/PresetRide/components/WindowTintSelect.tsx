import { Select } from "@mantine/core";
import React from "react";
import tints from "@/data/windowTints.json";
import { useStore } from "@/store";

const data = [{ value: "stock", label: "Stock" }, ...tints.map((tint) => ({ value: tint.id, label: tint.name }))];

export const WindowTintSelect = () => {
	const value = useStore((state) => state.getPresetRide()?.windowTint);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Select
			data={data}
			value={value}
			onChange={(value) => {
				if (value) {
					updateState({ windowTint: value });
				}
			}}
		/>
	);
};
