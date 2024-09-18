import { Box } from "@mantine/core";
import { useStore } from "@/store";
import { MenuItem } from "./MenuItem";
import { AddNewButton } from "./AddNewButton";
import styles from "./index.module.css";

export const Sidebar = () => {
	const presetRides = useStore((state) => state.presetRides);

	return (
		<nav className={styles.sidebar}>
			<Box p="xs">
				<AddNewButton />
			</Box>
			<div className={styles.menu}>
				<Box>
					{Object.keys(presetRides).map((key) => {
						const presetRide = presetRides[key];
						return <MenuItem data={presetRide} id={key} key={key} />;
					})}
				</Box>
			</div>
		</nav>
	);
};
