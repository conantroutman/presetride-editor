import { Box, Button, Checkbox, Fieldset, Select, Tabs } from "@mantine/core";
import decals from "@/data/decals.json";
import React from "react";
import { DecalState, useStore } from "@/store";

enum Tab {
	FrontWindshield = "windshieldF",
	RearWindshield = "windshieldR",
	LeftDoor = "doorL",
	RightDoor = "doorR",
	LeftQuarterPanel = "quarterPanelL",
	RightQuarterPanel = "quarterPanelR",
}

export const DecalsSelect = () => {
	const state = useStore((state) => state.getPresetRide()?.decals);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Tabs defaultValue={Tab.FrontWindshield} keepMounted={false}>
			<Tabs.List>
				<Tabs.Tab value={Tab.FrontWindshield}>
					Front Windshield
				</Tabs.Tab>
				<Tabs.Tab value={Tab.RearWindshield}>Rear Windshield</Tabs.Tab>
				<Tabs.Tab value={Tab.LeftDoor}>Left Door</Tabs.Tab>
				<Tabs.Tab value={Tab.RightDoor}>Right Door</Tabs.Tab>
				<Tabs.Tab value={Tab.LeftQuarterPanel}>
					Left Quarter Panel
				</Tabs.Tab>
				<Tabs.Tab value={Tab.RightQuarterPanel}>
					Right Quarter Panel
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value={Tab.FrontWindshield}>
				<DecalSelect
					value={state?.frontWindshield}
					onChange={(value) =>
						updateState({ decals: { frontWindshield: value } })
					}
				/>
			</Tabs.Panel>

			<Tabs.Panel value={Tab.RearWindshield}>
				<DecalSelect
					value={state?.rearWindshield}
					onChange={(value) =>
						updateState({ decals: { rearWindshield: value } })
					}
				/>
			</Tabs.Panel>

			<Tabs.Panel value={Tab.LeftDoor}>
				<Box mt="md">
					<Button
						variant="default"
						onClick={() => {
							updateState({ decals: { doorL: state?.doorR } });
						}}
					>
						Copy from Right Side
					</Button>
					<DecalSelect
						slot={1}
						value={state?.doorL?.slot1}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot1: value } } })
						}
					/>
					<DecalSelect
						slot={2}
						value={state?.doorL?.slot2}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot2: value } } })
						}
					/>
					<DecalSelect
						slot={3}
						value={state?.doorL?.slot3}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot3: value } } })
						}
					/>
					<DecalSelect
						slot={4}
						value={state?.doorL?.slot4}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot4: value } } })
						}
					/>
					<DecalSelect
						slot={5}
						value={state?.doorL?.slot5}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot5: value } } })
						}
					/>
					<DecalSelect
						slot={6}
						value={state?.doorL?.slot6}
						onChange={(value) =>
							updateState({ decals: { doorL: { slot6: value } } })
						}
					/>
				</Box>
			</Tabs.Panel>

			<Tabs.Panel value={Tab.RightDoor}>
				<Box mt="md">
					<Button
						variant="default"
						onClick={() => {
							updateState({ decals: { doorR: state?.doorL } });
						}}
					>
						Copy from Left Side
					</Button>
					<DecalSelect
						slot={1}
						value={state?.doorR?.slot1}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot1: value } } })
						}
					/>
					<DecalSelect
						slot={2}
						value={state?.doorR?.slot2}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot2: value } } })
						}
					/>
					<DecalSelect
						slot={3}
						value={state?.doorR?.slot3}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot3: value } } })
						}
					/>
					<DecalSelect
						slot={4}
						value={state?.doorR?.slot4}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot4: value } } })
						}
					/>
					<DecalSelect
						slot={5}
						value={state?.doorR?.slot5}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot5: value } } })
						}
					/>
					<DecalSelect
						slot={6}
						value={state?.doorR?.slot6}
						onChange={(value) =>
							updateState({ decals: { doorR: { slot6: value } } })
						}
					/>
				</Box>
			</Tabs.Panel>

			<Tabs.Panel value={Tab.LeftQuarterPanel}>
				<Box mt="md">
					<Button
						variant="default"
						onClick={() => {
							updateState({
								decals: { quarterPanelL: state?.quarterPanelR },
							});
						}}
					>
						Copy from Right Side
					</Button>
					<DecalSelect
						value={state?.quarterPanelL}
						onChange={(value) =>
							updateState({ decals: { quarterPanelL: value } })
						}
					/>
				</Box>
			</Tabs.Panel>

			<Tabs.Panel value={Tab.RightQuarterPanel}>
				<Box mt="md">
					<Button
						variant="default"
						onClick={() => {
							updateState({
								decals: { quarterPanelR: state?.quarterPanelL },
							});
						}}
					>
						Copy from Left Side
					</Button>
					<DecalSelect
						value={state?.quarterPanelR}
						onChange={(value) =>
							updateState({ decals: { quarterPanelR: value } })
						}
					/>
				</Box>
			</Tabs.Panel>
		</Tabs>
	);
};

interface DecalSelectProps {
	value: DecalState | undefined;
	slot?: number;
	onChange?: (value: Partial<DecalState>) => void;
}

const decalsData = [
	{ value: "stock", label: "Stock" },
	...decals.map((decal) => ({
		value: decal.id,
		label: decal.name,
	})),
];

const DecalSelect: React.FC<DecalSelectProps> = ({
	slot = 1,
	value,
	onChange,
}) => {
	return (
		<Fieldset legend={`Slot ${slot}`} mt="md">
			<Checkbox
				label="White"
				checked={value?.white}
				onChange={(e) => {
					onChange?.({ white: e.target.checked });
				}}
			/>
			<Select
				label="Sponsor"
				data={decalsData}
				searchable
				value={value?.style ?? "stock"}
				onChange={(style) => {
					if (style) {
						onChange?.({ style });
					}
				}}
			/>
		</Fieldset>
	);
};
