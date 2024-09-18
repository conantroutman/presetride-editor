import React, { useState } from "react";
import { CarSelect } from "./components/CarSelect";
import { Accordion, Box, Button, Container, Space, Stack } from "@mantine/core";
import { RimsSelect } from "./components/RimsSelect";
import { SpoilerSelect } from "./components/SpoilerSelect";
import { HoodSelect } from "./components/HoodSelect";
import { DecalsSelect } from "./components/DecalsSelect";
import { RoofScoopSelect } from "./components/RoofScoopSelect";
import { VinylSelect } from "./components/VinylSelect";
import { PaintSelect } from "./components/PaintSelect";
import { NameInput } from "./components/NameInput";
import { BodyKitSelect } from "./components/BodyKitSelect";
import { DownloadButton } from "./components/DownloadButton";
import styles from "./index.module.css";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { WindowTintSelect } from "./components/WindowTintSelect";
import { NumberSelect } from "./components/NumberSelect";

const items = [
	{
		label: "Body Kit",
		value: "bodyKit",
		component: <BodyKitSelect />,
	},
	{
		label: "Hood",
		value: "hood",
		component: <HoodSelect />,
	},
	{
		label: "Spoiler",
		value: "spoiler",
		component: <SpoilerSelect />,
	},
	{
		label: "Roof Scoop",
		value: "roofScoop",
		component: <RoofScoopSelect />,
	},
	{
		label: "Rims",
		value: "rims",
		component: <RimsSelect />,
	},
	{
		label: "Paint",
		value: "paint",
		component: <PaintSelect />,
	},
	{
		label: "Vinyl",
		value: "vinyl",
		component: <VinylSelect />,
	},
	{
		label: "Decals",
		value: "decals",
		component: <DecalsSelect />,
	},
	{
		label: "Number",
		value: "number",
		component: <NumberSelect />,
	},
	{
		label: "Window Tint",
		value: "windowTint",
		component: <WindowTintSelect />,
	},
];

interface Props {}

export const PresetRide: React.FC<Props> = () => {
	const [open, setOpen] = useState<string[]>([]);

	return (
		<ErrorBoundary fallbackRender={ErrorComponent}>
			<div className={styles.container}>
				<Container py="lg">
					<DownloadButton />
					<NameInput />
					<CarSelect />
					<Space h="md" />
					<Accordion multiple value={open} onChange={(value) => setOpen(value)} transitionDuration={0}>
						{items.map((item) => (
							<Accordion.Item key={item.value} value={item.value}>
								<Accordion.Control>{item.label}</Accordion.Control>
								<Accordion.Panel>
									<Box p="md">{open.includes(item.value) ? item.component : null}</Box>
								</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
				</Container>
			</div>
		</ErrorBoundary>
	);
};

const ErrorComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
	return (
		<Container>
			<Stack>
				{error.message}
				<Button
					onClick={() => {
						resetErrorBoundary();
					}}
				>
					Reload
				</Button>
			</Stack>
		</Container>
	);
};
