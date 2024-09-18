import { useStore } from "@/store";
import { Group, Select } from "@mantine/core";
import React from "react";

const options = new Array(9).fill(0).map((_, index) => ({ value: String(index + 1), label: String(index + 1) }));
console.log(options);

export const NumberSelect = () => {
	const state = useStore((state) => state.getPresetRide()?.number);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Group>
			<Select
				value={state?.left}
				data={options}
				onChange={(value) => {
					updateState({ number: { left: value } });
				}}
				clearable
				placeholder="Left"
				label="Left"
			/>
			<Select
				value={state?.right}
				data={options}
				onChange={(value) => {
					updateState({ number: { right: value } });
				}}
				clearable
				placeholder="Right"
				label="Right"
			/>
		</Group>
	);
};
