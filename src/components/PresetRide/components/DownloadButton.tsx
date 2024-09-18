import { useStore } from "@/store";
import { downloadFile } from "@/utils/downloadFile";
import { createEndFile } from "@/utils/endFile";
import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React from "react";

export const DownloadButton = () => {
	const presetRide = useStore((state) => state.getPresetRide());

	const handleClick = () => {
		if (!presetRide) {
			return;
		}

		const script = createEndFile(presetRide);

		downloadFile(script, presetRide.name);
	};

	return (
		<Button onClick={handleClick} leftSection={<IconDownload />}>
			Download
		</Button>
	);
};
