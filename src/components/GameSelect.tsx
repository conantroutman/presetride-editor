import React from "react";
import styles from "./GameSelect.module.css";
import { Box } from "@mantine/core";

export const GameSelect = () => {
	return (
		<div className={styles.container}>
			<Box>Most Wanted</Box>
			<Box>Underground 2</Box>
		</div>
	);
};
