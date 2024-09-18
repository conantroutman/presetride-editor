import { Select, Stack } from "@mantine/core";
import colors from "@/data/colors.json";
import React, { useEffect } from "react";
import { ColorSelect } from "./ColorSelect";
import { PaintCategory } from "@/data";
import { useStore } from "@/store";

const paintCategories: { value: PaintCategory; label: string }[] = [
	{
		value: "gloss",
		label: "Gloss",
	},
	{
		value: "metallic",
		label: "Metallic",
	},
	{
		value: "pearl",
		label: "Pearlescent",
	},
	{
		value: "chrome",
		label: "Chrome",
	},
	{
		value: "matte",
		label: "Matte",
	},
];

export const PaintSelect = () => {
	const category: PaintCategory = useStore((state) => state.getPresetRide()?.paint.category) ?? "gloss";
	const paint = useStore((state) => state.getPresetRide()?.paint.value);
	const updateState = useStore((state) => state.updatePresetRide);

	useEffect(() => {
		if (category && paint && !colors[category].map(({ id }) => id).includes(paint)) {
			updateState({ paint: { value: colors[category][0].id } });
		}
	}, [category, updateState, paint]);

	return (
		<Stack>
			<Select
				label="Category"
				data={paintCategories}
				value={category}
				onChange={(value) => {
					if (value) {
						updateState({ paint: { category: value as PaintCategory } });
					}
				}}
			/>
			<ColorSelect colors={colors[category]} value={paint} onChange={(value) => updateState({ paint: { value } })} />
		</Stack>
	);
};
