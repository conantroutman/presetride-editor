import { useStore } from "@/store";
import { Box, Button, Center, Container, Text } from "@mantine/core";

export const Empty = () => {
	const addPresetRide = useStore((state) => state.addPresetRide);

	const handleClick = () => {
		addPresetRide();
	};

	return (
		<Container>
			<Center>
				<Text>No PresetRides found.</Text>
			</Center>
			<Center>
				<Button onClick={handleClick}>Create New</Button>
			</Center>
		</Container>
	);
};
