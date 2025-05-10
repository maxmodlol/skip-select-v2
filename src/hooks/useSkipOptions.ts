import { useQuery } from "@tanstack/react-query";
import type { SkipOption } from "../types/SkipOption";
import { getSkipOptions } from "../api/getSkipOptions";

export function useSkipOptions() {
  return useQuery<SkipOption[]>({
    queryKey: ["skip-options"],
    queryFn: getSkipOptions,
    staleTime: 5 * 60 * 1000,
  });
}
