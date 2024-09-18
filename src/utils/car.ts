import { vehiclesMap } from "@/vehicles";

export function getFullCarName(model: string) {
	const data = vehiclesMap.get(model);
	if (!data) return undefined;

	const { manufacturer, name } = data;

	return `${manufacturer} ${name}`;
}
