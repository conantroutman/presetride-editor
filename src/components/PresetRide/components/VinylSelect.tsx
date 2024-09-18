import { Select, Stack, Tabs } from "@mantine/core";
import { vinyl as vinylColors } from "@/data/colors.json";
import vinyls from "@/data/vinyls.json";
import React, { useEffect, useMemo, useState } from "react";
import { ColorSelect } from "./ColorSelect";
import { useStore } from "@/store";
import { VinylCategory } from "@/data";

const categories: { value: VinylCategory | "stock"; label: string }[] = [
	{
		value: "stock",
		label: "Stock",
	},
	{
		value: "flame",
		label: "Flames",
	},
	{
		value: "tribal",
		label: "Tribal",
	},
	{
		value: "stripe",
		label: "Stripes",
	},
	{
		value: "race",
		label: "Race Flag",
	},
	{
		value: "national",
		label: "National Flag",
	},
	{
		value: "body",
		label: "Body",
	},
	{
		value: "unique",
		label: "Unique",
	},
	{
		value: "contest",
		label: "Contest Winner",
	},
];

export const VinylSelect = () => {
	return (
		<Stack>
			<Stack>
				<CategorySelect />
				<StyleSelect />
			</Stack>
			<VinylColor />
		</Stack>
	);
};

const CategorySelect = () => {
	const category = useStore((state) => state.getPresetRide()?.vinyl?.category);
	const updateState = useStore((state) => state.updatePresetRide);

	return (
		<Select
			value={category}
			defaultValue={"stock"}
			onChange={(value) => {
				if (value) {
					updateState({ vinyl: { category: value !== "stock" ? (value as VinylCategory) : null } });
				}
			}}
			data={categories}
			label="Category"
		/>
	);
};

const StyleSelect = () => {
	const category = useStore((state) => state.getPresetRide()?.vinyl?.category);
	const style = useStore((state) => state.getPresetRide()?.vinyl?.style);
	const updateState = useStore((state) => state.updatePresetRide);

	const vinylsData = useMemo(() => {
		if (!category) {
			return [];
		}

		return vinyls[category].map((vinyl) => ({ value: vinyl.id, label: vinyl.name }));
	}, [category]);

	useEffect(() => {
		if (category && style && !vinyls[category].map(({ id }) => id).includes(style)) {
			updateState({ vinyl: { style: vinyls[category][0].id } });
		}
	}, [category, style, updateState]);

	return (
		<Select
			data={vinylsData}
			placeholder="None"
			label="Style"
			value={style}
			onChange={(value) => {
				if (value !== null) {
					updateState({ vinyl: { style: value !== "stock" ? value : null } });
				}
			}}
			disabled={!category}
		/>
	);
};

const VinylColor = () => {
	const color = useStore((state) => state.getPresetRide()?.vinyl?.color);
	const updateState = useStore((state) => state.updatePresetRide);

	const handleChange = (value: string | undefined, slot: keyof NonNullable<typeof color>) => {
		if (!value) {
			return;
		}

		updateState({ vinyl: { color: { [slot]: value } } });
	};

	return (
		<Tabs defaultValue="1">
			<Tabs.List>
				<Tabs.Tab value="1">Color 1</Tabs.Tab>
				<Tabs.Tab value="2">Color 2</Tabs.Tab>
				<Tabs.Tab value="3">Color 3</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="1" mt="md">
				<ColorSelect colors={vinylColors} value={color?.slot1 ?? vinylColors[0].id} onChange={(value) => handleChange(value, "slot1")} />
			</Tabs.Panel>

			<Tabs.Panel value="2" mt="md">
				<ColorSelect colors={vinylColors} value={color?.slot2 ?? vinylColors[2].id} onChange={(value) => handleChange(value, "slot2")} />
			</Tabs.Panel>

			<Tabs.Panel value="3" mt="md">
				<ColorSelect colors={vinylColors} value={color?.slot3 ?? vinylColors[0].id} onChange={(value) => handleChange(value, "slot3")} />
			</Tabs.Panel>
		</Tabs>
	);
};
