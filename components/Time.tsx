import { useRef } from "react";
import { useTicks } from "~/lib/hooks/useTicks";

export const Time = ({ initial }: { readonly initial?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useTicks(ref);

  return <span ref={ref}>{initial}</span>;
};
