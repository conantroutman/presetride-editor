export function downloadFile(content: string, name?: string) {
	const file = new File([content], `${name || "script"}.end`, {
		type: "text/plain",
	});

	const link = document.createElement("a");
	const url = URL.createObjectURL(file);

	link.href = url;
	link.download = file.name;
	link.click();

	window.URL.revokeObjectURL(url);
}
