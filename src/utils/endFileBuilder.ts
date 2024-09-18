import { vehiclesMap } from "@/vehicles";
import { TextFileBuilder } from "./textFileBuilder";

const collections = [
	"Frontend",
	"MODEL",
	"Pvehicle",
	"AftermarketBodykit",
	"Base",
	"Brakelight",
	"CV",
	"Driver",
	"FrontBrake",
	"FrontLeftWindow",
	"FrontRightWindow",
	"FrontWheel",
	"FrontWindow",
	"Headlight",
	"Hood",
	"Interior",
	"LeftBrakelight",
	"LeftBrakelightGlass",
	"LeftHeadlight",
	"LeftHeadlightGlass",
	"LeftSideMirror",
	"LicensePlate",
	"Misc",
	"RearBrake",
	"RearLeftWindow",
	"RearRightWindow",
	"RearWheel",
	"RearWindow",
	"RightBrakelight",
	"RightBrakelightGlass",
	"RightHeadlight",
	"RightHeadlightGlass",
	"RightSideMirror",
	"RoofScoop",
	"Spinner",
	"Spoiler",
	"UniversalSpoilerBase",
	"WheelManufacturer",
	"WindshieldTint",
] as const;

const baseKitKitDamagesCollections = [
	"DamageBody",
	"DamageBushguard",
	"DamageCopLights",
	"DamageCopSpoiler",
	"DamageFrontBumper",
	"DamageFrontLeftWindow",
	"DamageFrontRightWindow",
	"DamageFrontWheel",
	"DamageFrontWindow",
	"DamageHood",
	"DamageLeftBrakelight",
	"DamageLeftDoor",
	"DamageLeftHeadlight",
	"DamageLeftRearDoor",
	"DamageRearBumper",
	"DamageRearLeftWindow",
	"DamageRearRightWindow",
	"DamageRightBrakelight",
	"DamageRightDoor",
	"DamageRightHeadlight",
	"DamageRightRearDoor",
	"DamageTrunk",
] as const;
const baseKitZeroDamagesCollections = ["ZeroDamageFront", "ZeroDamageFrontLeft", "ZeroDamageFrontRight", "ZeroDamageRear", "ZeroDamageRearLeft", "ZeroDamageRearRight"] as const;
const baseKitAttachmentsCollections = ["Attachment0", "Attachment1", "Attachment2", "Attachment3", "Attachment4", "Attachment5", "Attachment6", "Attachment7", "Attachment8", "Attachment9"] as const;
const baseKitDecalSizes = ["DecalFrontWindow", "DecalLeftDoor", "DecalLeftQuarter", "DecalRearWindow", "DecalRightDoor", "DecalRightQuarter"] as const;
const decalsCollections = ["DecalSlot0", "DecalSlot1", "DecalSlot2", "DecalSlot3", "DecalSlot4", "DecalSlot5", "DecalSlot6", "DecalSlot7"] as const;
const visualSetsCollections = ["BasePaintType", "RimsPaintType", "VinylColor0", "VinylColor1", "VinylColor2", "VinylColor3", "VinylLayer"] as const;
const visualHUDCollections = ["CustomHUD", "HUDBackingColor", "HUDCharacterColor", "HUDNeedleColor"] as const;

type BaseKitDamagesCollection = (typeof baseKitKitDamagesCollections)[number];
type BaseKitZeroDamagesCollection = (typeof baseKitZeroDamagesCollections)[number];
type BaseKitAttachmentsCollection = (typeof baseKitAttachmentsCollections)[number];
type BaseKitDecalSizesCollection = (typeof baseKitDecalSizes)[number];
type DecalsCollection = (typeof decalsCollections)[number];
type VisualSetsCollection = (typeof visualSetsCollections)[number];
type VisualHUDCollection = (typeof visualHUDCollections)[number];

type Collection = (typeof collections)[number];
type NestedCollection =
	| [
			"BaseKit",
			...(
				| ["KIT_DAMAGES", BaseKitDamagesCollection]
				| ["ZERO_DAMAGES", BaseKitZeroDamagesCollection]
				| ["ATTACHMENTS", BaseKitAttachmentsCollection]
				| ["DECAL_SIZES", BaseKitDecalSizesCollection]
			)
	  ]
	| ["Decals", "DECALS_FRONT_WINDOW" | "DECALS_REAR_WINDOW" | "DECALS_LEFT_DOOR" | "DECALS_RIGHT_DOOR" | "DECALS_LEFT_QUARTER" | "DECALS_RIGHT_QUARTER", DecalsCollection]
	| ["Visuals", ...(["VISUAL_SETS", VisualSetsCollection] | ["HUD", VisualHUDCollection])];

export class EndFileBuilder {
	private builder: TextFileBuilder = new TextFileBuilder();

	private presetRideName: string;

	private model: string;

	constructor(presetRideName: string, model: string) {
		this.presetRideName = presetRideName.toUpperCase();
		this.model = model;

		this.addVersion().addCollection().setDefaults();
	}

	private addVersion() {
		this.builder.addLine("[VERSN2]").addEmptyLine();
		return this;
	}

	private addCollection() {
		this.builder.addLine(`add_collection GLOBAL\\GLOBALB.LZC PresetRides ${this.presetRideName}`).addEmptyLine();
		return this;
	}

	private setDefaults() {
		const carData = vehiclesMap.get(this.model);
		if (!carData) {
			throw new Error("Invalid car model!");
		}

		this.updateCollection("Frontend", carData.frontend)
			.updateCollection("MODEL", this.model)
			.updateCollection("Pvehicle", carData.pVehicle)
			.updateCollection("AftermarketBodykit", `${this.model}_BODY_KIT00`)
			.updateCollection("Base", this.model + "_BASE")
			.updateCollection("Driver", this.model + "_DRIVER")
			.updateCollection("FrontBrake", this.model + "_FRONT_BRAKE")
			.updateCollection("FrontLeftWindow", this.model + "_FRONT_LEFT_WINDOW")
			.updateCollection("FrontRightWindow", this.model + "_FRONT_RIGHT_WINDOW")
			.updateCollection("FrontWheel", this.model + "_WHEEL")
			.updateCollection("FrontWindow", this.model + "_FRONT_WINDOW")
			.updateCollection("Hood", this.model + "_KIT00_HOOD")
			.updateCollection("Interior", this.model + "_INTERIOR")
			.updateCollection("LeftBrakelight", this.model + "_LEFT_BRAKELIGHT")
			.updateCollection("LeftBrakelightGlass", this.model + "_LEFT_BRAKELIGHT_GLASS")
			.updateCollection("LeftHeadlight", this.model + "_LEFT_HEADLIGHT")
			.updateCollection("LeftHeadlightGlass", this.model + "_LEFT_HEADLIGHT_GLASS")
			.updateCollection("LeftSideMirror", this.model + "_LEFT_SIDE_MIRROR")
			.updateCollection("LicensePlate", "LICENSE_PLATE_STYLE01")
			.updateCollection("RearBrake", this.model + "_REAR_BRAKE")
			.updateCollection("RearLeftWindow", this.model + "_REAR_LEFT_WINDOW")
			.updateCollection("RearRightWindow", this.model + "_REAR_RIGHT_WINDOW")
			.updateCollection("RearWindow", this.model + "_REAR_WINDOW")
			.updateCollection("RightBrakelight", this.model + "_RIGHT_BRAKELIGHT")
			.updateCollection("RightBrakelightGlass", this.model + "_RIGHT_BRAKELIGHT_GLASS")
			.updateCollection("RightHeadlight", this.model + "_RIGHT_HEADLIGHT")
			.updateCollection("RightHeadlightGlass", this.model + "_RIGHT_HEADLIGHT_GLASS")
			.updateCollection("RightSideMirror", this.model + "_RIGHT_SIDE_MIRROR")
			.updateCollection("RoofScoop", "ROOF_STYLE00")
			.updateCollection("Spoiler", this.model + "_SPOILER")
			.updateCollection("UniversalSpoilerBase", this.model + "_UNIVERSAL_SPOILER_BASE")
			.updateCollection("WindshieldTint", "WINDOW_TINT_STOCK")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageBody"], this.model + "_DAMAGE_0_BODY")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageBushguard"], this.model + "_DAMAGE_0_BUSHGUARD")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageCopLights"], this.model + "_DAMAGE_0_COP_LIGHTS")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageCopSpoiler"], this.model + "_DAMAGE_0_COP_SPOILER")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageFrontBumper"], this.model + "_DAMAGE_0_FRONT_BUMPER")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageFrontLeftWindow"], this.model + "_DAMAGE_0_FRONT_LEFT_WINDOW")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageFrontRightWindow"], this.model + "_DAMAGE_0_FRONT_RIGHT_WINDOW")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageFrontWheel"], this.model + "_DAMAGE_0_FRONT_WHEEL")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageFrontWindow"], this.model + "_DAMAGE_0_FRONT_WINDOW")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageHood"], this.model + "_DAMAGE_0_HOOD")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageLeftBrakelight"], this.model + "_DAMAGE_0_LEFT_BRAKELIGHT")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageLeftDoor"], this.model + "_DAMAGE_0_LEFT_DOOR")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageLeftHeadlight"], this.model + "_DAMAGE_0_LEFT_HEADLIGHT")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageLeftRearDoor"], this.model + "_DAMAGE_0_REAR_DOOR")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRearBumper"], this.model + "_DAMAGE_0_REAR_BUMPER")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRearLeftWindow"], this.model + "_DAMAGE_0_REAR_LEFT_WINDOW")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRearRightWindow"], this.model + "_DAMAGE_0_REAR_RIGHT_WINDOW")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRightBrakelight"], this.model + "_DAMAGE_0_RIGHT_BRAKELIGHT")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRightDoor"], this.model + "_DAMAGE_0_RIGHT_DOOR")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRightHeadlight"], this.model + "_DAMAGE_0_RIGHT_HEADLIGHT")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageRightRearDoor"], this.model + "_DAMAGE_0_RIGHT_REAR_DOOR")
			.updateCollection(["BaseKit", "KIT_DAMAGES", "DamageTrunk"], this.model + "_DAMAGE_0_TRUNK")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageFront"], "DAMAGE0_FRONT")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageFrontLeft"], "DAMAGE0_FRONTLEFT")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageFrontRight"], "DAMAGE0_FRONTRIGHT")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageRear"], "DAMAGE0_REAR")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageRearLeft"], "DAMAGE0_REARLEFT")
			.updateCollection(["BaseKit", "ZERO_DAMAGES", "ZeroDamageRearRight"], "DAMAGE0_REARRIGHT")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment0"], this.model + "_ATTACHMENT0")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment1"], this.model + "_ATTACHMENT1")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment2"], this.model + "_ATTACHMENT2")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment3"], this.model + "_ATTACHMENT3")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment4"], this.model + "_ATTACHMENT4")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment5"], this.model + "_ATTACHMENT5")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment6"], this.model + "_ATTACHMENT6")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment7"], this.model + "_ATTACHMENT7")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment8"], this.model + "_ATTACHMENT8")
			.updateCollection(["BaseKit", "ATTACHMENTS", "Attachment9"], this.model + "_ATTACHMENT9")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalFrontWindow"], this.model + "_DECAL_FRONT_WINDOW_WIDE_MEDIUM")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalLeftDoor"], this.model + "_KIT00_DECAL_LEFT_DOOR_RECT_MEDIUM")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalLeftQuarter"], this.model + "_KIT00_DECAL_LEFT_QUARTER_RECT_MEDIUM")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalRearWindow"], this.model + "_DECAL_REAR_WINDOW_WIDE_MEDIUM")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalRightDoor"], this.model + "_KIT00_DECAL_RIGHT_DOOR_RECT_MEDIUM")
			.updateCollection(["BaseKit", "DECAL_SIZES", "DecalRightQuarter"], this.model + "_KIT00_DECAL_RIGHT_QUARTER_RECT_MEDIUM")
			.updateCollection(["Visuals", "VISUAL_SETS", "BasePaintType"], "GLOSS_L1_COLOR01")
			.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor0"], "VINYL_L1_COLOR01")
			.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor1"], "VINYL_L1_COLOR03")
			.updateCollection(["Visuals", "VISUAL_SETS", "VinylColor3"], "VINYL_L1_COLOR01")
			.updateCollection(["Visuals", "HUD", "CustomHUD"], "STOCK")
			.updateCollection(["Visuals", "HUD", "HUDBackingColor"], "ORANGE")
			.updateCollection(["Visuals", "HUD", "HUDCharacterColor"], "WHITE")
			.updateCollection(["Visuals", "HUD", "HUDNeedleColor"], "ORANGE");

		return this;
	}

	updateCollection(collection: Collection | NestedCollection, value: string | number | boolean | null) {
		const formatValue = () => {
			if (typeof value === "string") {
				return value;
			}

			if (typeof value === "number") {
				return value.toString();
			}

			if (typeof value === "boolean") {
				return value ? "True" : "False";
			}

			if (value === null) {
				return "NULL";
			}
		};

		this.builder.addLine(`update_collection GLOBAL\\GLOBALB.LZC PresetRides ${this.presetRideName} ${Array.isArray(collection) ? collection.join(" ") : collection} ${formatValue()}`);
		return this;
	}

	build() {
		return this.builder.end();
	}
}
