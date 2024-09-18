import { Group, Input, Select, Slider, Stack, rem } from "@mantine/core";
import React from "react";
import { useStore } from "@/store";
import { rimBrands, rimStylesMap } from "@/data";
import { wheel } from "@/data/colors.json";
import { ColorSelect } from "./ColorSelect";

const RIM_SIZES = [17, 18, 19, 20];

export const RimsSelect = () => {
	const style = useStore((state) => state.getPresetRide()?.rims.style);
	const size = useStore((state) => state.getPresetRide()?.rims.size);
	const brand = useStore((state) => state.getPresetRide()?.rims.brand);
	const updateState = useStore((state) => state.updatePresetRide);

	const data = brand ? rimStylesMap.get(brand)?.map(({ name, id }) => ({ value: `${id}`, label: name })) : [];

	return (
		<Stack gap="lg">
			<Group gap={0}>
				<BrandSelect />
				<Select
					data={data}
					value={style}
					onChange={(value) => {
						if (value !== null) {
							updateState({ rims: { style: value } });
						}
					}}
					searchable
					disabled={brand === "STOCK"}
				/>
			</Group>
			<Input.Wrapper label="Size">
				<Slider
					marks={RIM_SIZES.map((size) => ({
						value: size,
						label: `${size}"`,
					}))}
					value={size}
					onChange={(value) => updateState({ rims: { size: value } })}
					min={RIM_SIZES[0]}
					max={RIM_SIZES[RIM_SIZES.length - 1]}
					disabled={brand === "STOCK"}
				/>
			</Input.Wrapper>
			<Input.Wrapper label="Paint">
				<RimPaintSelect />
			</Input.Wrapper>
		</Stack>
	);
};

const BrandSelect = () => {
	const brand = useStore((state) => state.getPresetRide()?.rims.brand);
	const updateState = useStore((state) => state.updatePresetRide);
	const data = [{ value: "STOCK", label: "Stock" }, ...rimBrands.map((brand) => ({ value: brand.id, label: brand.name }))];

	return (
		<Select
			data={data}
			value={brand}
			onChange={(value) => {
				if (value !== null) {
					updateState({ rims: { brand: value, style: value !== "STOCK" ? "1" : null } });
				}
			}}
			width={120}
			style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: rem(120) }}
		/>
	);
};

const RimPaintSelect = () => {
	const paint = useStore((state) => state.getPresetRide()?.rims.paint);
	const updateState = useStore((state) => state.updatePresetRide);
	return (
		<ColorSelect
			colors={wheel}
			value={paint ?? wheel[0].id}
			onChange={(value) => {
				if (value) {
					updateState({ rims: { paint: value } });
				}
			}}
		/>
	);
};
