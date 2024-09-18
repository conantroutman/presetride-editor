import { RoofScoopVariant, useStore } from "@/store";
import { Checkbox, Group, Radio, Select, Stack } from "@mantine/core";
import roofScoops from "@/data/roofScoops.json";

const data = [
	{
		value: "0",
		label: "Stock",
	},
	...roofScoops.map(({ id, name }) => ({ label: name, value: id })),
];

export const RoofScoopSelect = () => {
	const state = useStore((state) => state.getPresetRide()?.roofScoop);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Stack>
			<Radio.Group
				name="roofScoopVariant"
				label="Variant"
				value={state?.variant}
				onChange={(value) =>
					updateState({
						roofScoop: { variant: value as RoofScoopVariant },
					})
				}
			>
				<Group mt="xs">
					<Radio value="normal" label="Normal" />
					<Radio value="offset" label="Offset" />
					<Radio value="dual" label="Dual" />
				</Group>
			</Radio.Group>
			<Checkbox
				label="Carbon Fiber"
				checked={state?.carbon}
				onChange={(e) =>
					updateState({ roofScoop: { carbon: e.target.checked } })
				}
			/>
			<Select
				data={data}
				value={state?.style}
				label="Style"
				onChange={(value) => {
					if (value) {
						updateState({ roofScoop: { style: value } });
					}
				}}
			/>
		</Stack>
	);
};
