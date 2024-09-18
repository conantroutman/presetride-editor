import { useStore } from "@/store";
import { TextInput } from "@mantine/core";
import React from "react";

export const NameInput = () => {
  const name = useStore((state) => state.getPresetRide().name);
  const updatePresetRide = useStore((state) => state.updatePresetRide);

  return (
    <TextInput
      label="Name"
      value={name}
      onChange={(e) => updatePresetRide({ name: e.target.value })}
    />
  );
};
