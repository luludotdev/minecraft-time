import type { RefObject } from "react";
import { useAnimationFrame } from "~/lib/hooks/useAnimationFrame";

// Earliest recorded Minecraft version
// May 10, 2009
const MINECRAFT_EPOCH = 1_241_910_000_000;
export const getTime = () => ((Date.now() - MINECRAFT_EPOCH) / 50).toFixed(0);

export const useTicks = (ref: RefObject<HTMLSpanElement | null>) => {
  useAnimationFrame(() => {
    if (ref.current) {
      ref.current.innerHTML = getTime();
    }
  }, []);
};
