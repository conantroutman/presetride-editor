import { Checkbox, Select, Stack } from "@mantine/core";
import hoods from "@/data/hoods.json";
import { useStore } from "@/store";

const data = [
	{
		value: "0",
		label: "Stock",
	},
	...hoods.map((hood) => ({ value: hood.id, label: hood.name })),
];

export const HoodSelect = () => {
	const state = useStore((state) => state.getPresetRide()?.hood);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Stack>
			<Checkbox
				label="Carbon Fiber"
				checked={state?.carbon}
				onChange={(e) =>
					updateState({
						hood: { carbon: e.target.checked },
					})
				}
			/>
			<Select
				data={data}
				value={state?.style}
				onChange={(value) => {
					if (value) {
						updateState({ hood: { style: value } });
					}
				}}
				label="Style"
			/>
		</Stack>
	);
};
