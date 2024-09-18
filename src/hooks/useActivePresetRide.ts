import { useStore } from "@/store";

export function useActivePresetRide() {
  const presetRide = useStore((state) =>
    state.active ? state.presetRides[state.active] : undefined
  );
  const updatePresetRide = useStore((state) => state.updatePresetRide);

  const setName = (name: string) => {
    updatePresetRide({ name });
  };

  return {
    presetRide,
    setName,
  };
}
