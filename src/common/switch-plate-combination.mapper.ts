import type { SwitchPlateColour } from "../models/SwitchPlateColour.entity";
import type { SwitchPlateColourCombination } from "../models/SwitchPlateColourCombination.entity";
import type { SwitchPlateStyle } from "../models/SwitchPlateStyle.entity";
import type { SwitchPlateStyleColourCombination } from "../models/SwitchPlateStyleColourCombination.entity";

function mapSwitchPlateColourForApi(c: SwitchPlateColour) {
  return {
    id: c.id,
    name: c.name,
    code: c.code,
  };
}

function mapSwitchPlateStyleForApi(s: SwitchPlateStyle) {
  return {
    id: s.id,
    name: s.name,
    code: s.code,
    supportsCustomColours: s.supportsCustomColours,
  };
}

export function mapColourCombinationForApi(c: SwitchPlateColourCombination) {
  return {
    id: c.id,
    name: c.name,
    code: c.code,
    backplateColour: mapSwitchPlateColourForApi(c.backplateColour),
    faceplateColour: mapSwitchPlateColourForApi(c.faceplateColour),
    mechColour: mapSwitchPlateColourForApi(c.mechColour),
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    deletedAt: c.deletedAt ?? null,
  };
}

export function mapStyleColourCombinationForApi(s: SwitchPlateStyleColourCombination) {
  return {
    id: s.id,
    style: mapSwitchPlateStyleForApi(s.style),
    colourCombination: mapColourCombinationForApi(s.colourCombination),
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
    deletedAt: s.deletedAt ?? null,
  };
}

export type ColourCombinationApi = ReturnType<typeof mapColourCombinationForApi>;
export type StyleColourCombinationApi = ReturnType<typeof mapStyleColourCombinationForApi>;
