import type { HeroesSummary } from "@/types/get-summary.response";
import { api } from "../api/api.heroes";

export const getSummaryAction = async () => {
    const {data} = await api.get<HeroesSummary>("/api/heroes/summary");
    return data;
}