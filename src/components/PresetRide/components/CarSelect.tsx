import React from "react";
import { Car, vehicles, vehiclesMap } from "../../../vehicles";
import { Select, SelectProps } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import {
	SiAstonmartin,
	SiAudi,
	SiCadillac,
	SiChevrolet,
	SiChrysler,
	SiFiat,
	SiFord,
	SiLamborghini,
	SiMazda,
	SiMercedes,
	SiMitsubishi,
	SiPorsche,
	SiRenault,
	SiSubaru,
	SiToyota,
	SiVauxhall,
	SiVolkswagen,
} from "@icons-pack/react-simple-icons";
import { useStore } from "@/store";
import styles from "./CarSelect.module.css";

const iconProps = {
	stroke: 1.5,
	color: "currentColor",
	opacity: 0.6,
	size: 18,
};

const siIconProps = {
	color: "currentColor",
	size: 18,
};

const icons: Partial<Record<Car["manufacturer"], React.ReactNode>> = {
	"Aston Martin": <SiAstonmartin {...siIconProps} />,
	Audi: <SiAudi {...siIconProps} />,
	Cadillac: <SiCadillac {...siIconProps} />,
	Chevrolet: <SiChevrolet {...siIconProps} />,
	Dodge: <SiChrysler {...siIconProps} />,
	Fiat: <SiFiat {...siIconProps} />,
	Ford: <SiFord {...siIconProps} />,
	Lamborghini: <SiLamborghini {...siIconProps} />,
	Mazda: <SiMazda {...siIconProps} />,
	"Mercedes-Benz": <SiMercedes {...siIconProps} />,
	Mitsubishi: <SiMitsubishi {...siIconProps} />,
	Porsche: <SiPorsche {...siIconProps} />,
	Renault: <SiRenault {...siIconProps} />,
	Subaru: <SiSubaru {...siIconProps} />,
	Toyota: <SiToyota {...siIconProps} />,
	Vauxhall: <SiVauxhall {...siIconProps} />,
	Volkswagen: <SiVolkswagen {...siIconProps} />,
};

const options = vehicles.map((vehicle) => ({
	label: `${vehicle.manufacturer} ${vehicle.name}`,
	value: vehicle.model,
}));

export const CarSelect: React.FC = () => {
	const model = useStore((state) => state.getPresetRide()?.carModel);
	const updateState = useStore((state) => state.updatePresetRide);

	const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => {
		const model = vehiclesMap.get(option.value)?.manufacturer as Car["manufacturer"];

		return (
			<div className={styles.option}>
				{icons[model]}
				{option.label}
				{checked && <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />}
			</div>
		);
	};

	return (
		<Select
			value={model}
			data={options}
			checkIconPosition="right"
			renderOption={renderSelectOption}
			label="Car"
			onChange={(value) => {
				if (value) {
					updateState({ carModel: value, bodyKit: "0" });
				}
			}}
		/>
	);
};
