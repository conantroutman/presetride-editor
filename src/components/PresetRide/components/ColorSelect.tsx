import { CheckIcon, ColorSwatch, rem } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ColorSelect.module.css";
import { PaintColor } from "../../../utils/types";

interface Props {
	value: string | undefined;
	onChange: (value: Props["value"]) => void;
	colors: PaintColor[];
}

export const ColorSelect: React.FC<Props> = ({ value, onChange, colors }) => {
	const [checked, setChecked] = useState<string | undefined>(value);
	const currentValue = useRef(value);

	useEffect(() => {
		if (currentValue.current !== checked) {
			onChange(checked);
			currentValue.current = checked;
		}
	}, [checked, onChange]);

	useEffect(() => {
		if (currentValue.current !== value) {
			currentValue.current = value;
			setChecked(value);
		}
	}, [value]);

	return (
		<div className={styles.grid}>
			{colors.map((color) => (
				<Swatch
					key={color.id}
					color={color}
					checked={checked === color.id}
					onClick={() => {
						setChecked(color.id);
					}}
				/>
			))}
		</div>
	);
};

interface SwatchProps {
	color: PaintColor;
	checked: boolean;
	onClick: () => void;
}

const Swatch: React.FC<SwatchProps> = ({ color, checked, onClick }) => {
	return (
		<ColorSwatch
			color={color.hex}
			component="button"
			radius="sm"
			onClick={onClick}
			styles={{
				root: {
					cursor: "pointer",
				},
			}}
		>
			{checked && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
		</ColorSwatch>
	);
};
