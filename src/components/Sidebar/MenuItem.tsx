import { PresetRide, useStore } from "@/store";
import { getFullCarName } from "@/utils/car";
import { ActionIcon, NavLink, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

interface Props {
	data: PresetRide;
	id: string;
}

export const MenuItem: React.FC<Props> = ({ data, id }) => {
	const active = useStore((state) => state.active);
	const setActive = useStore((state) => state.setActive);

	const [isHovering, setIsHovering] = useState(false);

	return (
		<NavLink
			href="#"
			label={data.name}
			description={getFullCarName(data.carModel)}
			active={active === id}
			onClick={() => setActive(id)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			rightSection={isHovering ? <DeleteButton id={id} /> : null}
		/>
	);
};

interface DeleteButtonProps {
	id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
	const removePresetRide = useStore((state) => state.removePresetRide);

	return (
		<Tooltip label="Delete PresetRide">
			<ActionIcon
				size="xs"
				color="red"
				onClick={(e) => {
					e.stopPropagation();
					removePresetRide(id);
				}}
			>
				<IconTrash />
			</ActionIcon>
		</Tooltip>
	);
};
