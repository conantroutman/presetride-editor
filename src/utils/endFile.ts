import { DecalState, PresetRide, RoofScoopVariant } from "@/store";
import { EndFileBuilder } from "./endFileBuilder";
import { addLeadingZero } from "./numbers";
import { SpoilerType, vehiclesMap } from "@/vehicles";

export function createEndFile(presetRide: PresetRide) {
	const builder = new EndFileBuilder(presetRide.name, presetRide.carModel);

	if (presetRide.bodyKit !== "0") {
		updateBodyKit(presetRide.carModel, presetRide.bodyKit, builder);
	}

	if (presetRide.hood.style !== "0") {
		builder.updateCollection("Hood", `${presetRide.carModel}_STYLE${addLeadingZero(presetRide.hood.style)}_HOOD${presetRide.hood.carbon ? "_CF" : ""}`);
	}

	if (presetRide.spoiler.style !== "0") {
		builder.updateCollection("Spoiler", `SPOILER_STYLE${addLeadingZero(presetRide.spoiler.style)}${getSpoilerType(presetRide.carModel)}${presetRide.spoiler.carbon ? "_CF" : ""}`);
	}

	if (presetRide.roofScoop.style !== "0") {
		builder.updateCollection(
			"RoofScoop",
			`ROOF_STYLE${addLeadingZero(presetRide.roofScoop.style)}${getRoofScoopVariantSuffix(presetRide.roofScoop.variant)}${presetRide.roofScoop.carbon ? "_CF" : ""}`
		);
	}

	if (presetRide.rims.brand !== "STOCK" && presetRide.rims.style !== null) {
		builder.updateCollection("FrontWheel", `${presetRide.rims.brand}_STYLE${addLeadingZero(presetRide.rims.style)}_${presetRide.rims.size}_25`);
	}

	if (presetRide.rims.paint) {
		builder.updateCollection(["Visuals", "VISUAL_SETS", "RimsPaintType"], presetRide.rims.paint);
	}

	if (presetRide.decals) {
		updateDecals(presetRide.decals, builder);
	}

	if (presetRide.number?.left || presetRide.number?.right) {
		if (presetRide.number?.left) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot6"], `NUMBER_LEFT_${presetRide.number.left}`);
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot6"], `NUMBER_LEFT_${presetRide.number.left}`);
		}

		if (presetRide.number?.right) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot7"], `NUMBER_RIGHT_${presetRide.number.left}`);
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot7"], `NUMBER_RIGHT_${presetRide.number.left}`);
		}
	}

	if (presetRide.windowTint !== "stock") {
		builder.updateCollection("WindshieldTint", `WINDSHIELD_TINT_${presetRide.windowTint}`);
	}

	if (presetRide.vinyl) {
		builder.updateCollection(["Visuals", "VISUAL_SETS", "VinylLayer"], presetRide.vinyl.style);
		if (presetRide.vinyl.color?.slot1) builder.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor0"], presetRide.vinyl.color.slot1);
		if (presetRide.vinyl.color?.slot2) builder.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor1"], presetRide.vinyl.color.slot2);
		if (presetRide.vinyl.color?.slot3) builder.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor2"], presetRide.vinyl.color.slot3);
	}

	builder.updateCollection(["Visuals", "VISUAL_SETS", "BasePaintType"], presetRide.paint.value);

	const script = builder.build();

	return script;
}

function updateBodyKit(model: NonNullable<PresetRide["carModel"]>, bodyKit: NonNullable<PresetRide["bodyKit"]>, builder: EndFileBuilder) {
	builder.updateCollection("AftermarketBodykit", `${model}_BODY_KIT0${bodyKit}`);
	builder.updateCollection(["BaseKit", "DECAL_SIZES", "DecalLeftDoor"], `${model}_KIT0${bodyKit}_DECAL_LEFT_DOOR_RECT_MEDIUM`);
	builder.updateCollection(["BaseKit", "DECAL_SIZES", "DecalLeftQuarter"], `${model}_KIT0${bodyKit}_DECAL_LEFT_QUARTER_RECT_MEDIUM`);
	builder.updateCollection(["BaseKit", "DECAL_SIZES", "DecalRightDoor"], `${model}_KIT0${bodyKit}_DECAL_RIGHT_DOOR_RECT_MEDIUM`);
	builder.updateCollection(["BaseKit", "DECAL_SIZES", "DecalRightQuarter"], `${model}_KIT0${bodyKit}_DECAL_RIGHT_QUARTER_RECT_MEDIUM`);
}

function updateDecals(decals: NonNullable<PresetRide["decals"]>, builder: EndFileBuilder) {
	if (decals.frontWindshield) {
		builder.updateCollection(["Decals", "DECALS_FRONT_WINDOW", "DecalSlot0"], decalValue(decals.frontWindshield));
	}

	if (decals.rearWindshield) {
		builder.updateCollection(["Decals", "DECALS_REAR_WINDOW", "DecalSlot0"], decalValue(decals.rearWindshield));
	}

	if (decals.doorL) {
		if (decals.doorL.slot1) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot0"], decalValue(decals.doorL.slot1));
		}
		if (decals.doorL.slot2) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot1"], decalValue(decals.doorL.slot2));
		}
		if (decals.doorL.slot3) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot2"], decalValue(decals.doorL.slot3));
		}
		if (decals.doorL.slot4) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot3"], decalValue(decals.doorL.slot4));
		}
		if (decals.doorL.slot5) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot4"], decalValue(decals.doorL.slot5));
		}
		if (decals.doorL.slot6) {
			builder.updateCollection(["Decals", "DECALS_LEFT_DOOR", "DecalSlot5"], decalValue(decals.doorL.slot6));
		}
	}

	if (decals.doorR) {
		if (decals.doorR.slot1) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot0"], decalValue(decals.doorR.slot1));
		}
		if (decals.doorR.slot2) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot1"], decalValue(decals.doorR.slot2));
		}
		if (decals.doorR.slot3) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot2"], decalValue(decals.doorR.slot3));
		}
		if (decals.doorR.slot4) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot3"], decalValue(decals.doorR.slot4));
		}
		if (decals.doorR.slot5) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot4"], decalValue(decals.doorR.slot5));
		}
		if (decals.doorR.slot6) {
			builder.updateCollection(["Decals", "DECALS_RIGHT_DOOR", "DecalSlot5"], decalValue(decals.doorR.slot6));
		}
	}

	if (decals.quarterPanelL) {
		builder.updateCollection(["Decals", "DECALS_LEFT_QUARTER", "DecalSlot0"], decalValue(decals.quarterPanelL));
	}

	if (decals.quarterPanelR) {
		builder.updateCollection(["Decals", "DECALS_RIGHT_QUARTER", "DecalSlot0"], decalValue(decals.quarterPanelR));
	}
}

function getRoofScoopVariantSuffix(variant: RoofScoopVariant) {
	switch (variant) {
		case "dual":
			return "_DUAL";

		case "offset":
			return "_OFFSET";

		default:
			return "";
	}
}

function decalValue(decal: DecalState) {
	return `${decal.style}${decal.white ? "_WHITE" : "_BLACK"}_DECAL`;
}

function getSpoilerType(model: string) {
	const data = vehiclesMap.get(model);

	console.log(data);

	if (!data) return "";

	switch (data.spoilerType) {
		case SpoilerType.Porsches:
			return "_PORSCHES";

		case SpoilerType.CarreraGT:
			return "_CARRERA";

		case SpoilerType.Hatch:
			return "_HATCH";

		default:
			return "";
	}
}
