import { ExtractionPattern } from "@/entities/pattern/model/types";

export interface PatternTemplate {
    id: string;
    name: string;
    createdAt: number;
    config: ExtractionPattern;
}