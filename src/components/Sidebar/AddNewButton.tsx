import { useStore } from "@/store";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export const AddNewButton = () => {
	const addPresetRide = useStore((state) => state.addPresetRide);

	const handleClick = () => {
		addPresetRide();
	};

	return (
		<Button fullWidth onClick={handleClick} leftSection={<IconPlus />}>
			New PresetRide
		</Button>
	);
};
