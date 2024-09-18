import { Checkbox, Group, Radio, Select, Stack } from "@mantine/core";
import spoilers from "@/data/spoilers.json";
import React, { useEffect, useRef } from "react";
import { SpoilerCategory, useStore } from "@/store";

export const SpoilerSelect = () => {
	const spoilerState = useStore((state) => state.getPresetRide()?.spoiler);
	const updateState = useStore((state) => state.updatePresetRide);
	const previousCategory = useRef(spoilerState?.category);

	const spoilersData = spoilerState?.category
		? [
				{
					value: "0",
					label: "Stock",
				},
				...spoilers[spoilerState.category].map((spoiler) => ({
					value: spoiler.id,
					label: spoiler.name,
				})),
		  ]
		: [];

	useEffect(() => {
		if (spoilerState?.category && previousCategory.current !== spoilerState.category && !spoilers[spoilerState.category].map(({ id }) => id).includes(spoilerState.style)) {
			updateState({ spoiler: { style: "0" } });
			previousCategory.current = spoilerState?.category;
		}
	}, [spoilerState?.category, spoilerState?.style, updateState]);

	return (
		<Stack>
			<Radio.Group
				name="spoilerCategory"
				label="Category"
				value={spoilerState?.category}
				onChange={(value) =>
					updateState({
						spoiler: { category: value as SpoilerCategory },
					})
				}
			>
				<Group mt="xs">
					<Radio value="sport" label="Sport" />
					<Radio value="tuner" label="Tuner" />
				</Group>
			</Radio.Group>
			<Checkbox
				label="Carbon Fiber"
				checked={spoilerState?.carbon}
				onChange={(e) =>
					updateState({
						spoiler: { carbon: e.target.checked },
					})
				}
			/>
			<Select
				data={spoilersData}
				value={spoilerState?.style}
				onChange={(value) => {
					if (value) {
						updateState({ spoiler: { style: value } });
					}
				}}
				label="Style"
			/>
		</Stack>
	);
};
