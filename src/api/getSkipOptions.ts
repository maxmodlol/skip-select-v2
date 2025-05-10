import api from "../config/axios";
import type { SkipOption, SkipOtionsDto } from "../types/SkipOption";
import placeholder from "/skip-placeholder.jpg";

const postcode = import.meta.env.VITE_DEFAULT_POSTCODE;
const area = import.meta.env.VITE_DEFAULT_AREA;

export async function getSkipOptions(): Promise<SkipOption[]> {
  const { data } = await api.get("/api/skips/by-location", {
    params: { postcode, area },
  });

  return data.map((s: SkipOtionsDto) => ({
    id: s.id,
    yards: s.size,
    price: s.price_before_vat,
    days: s.hire_period_days,
    roadRestriction: !s.allowed_on_road,
    image: placeholder,
  })) as SkipOption[];
}
