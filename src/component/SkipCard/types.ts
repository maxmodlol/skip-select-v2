import type { SkipOption } from "../../types/SkipOption";

export interface SkipCardProps {
  skip: SkipOption;
  selected: boolean;
  onSelect: (skip: SkipOption) => void;
}
