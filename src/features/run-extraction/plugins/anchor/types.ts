import { AnchorPoint } from "@/entities/pattern/model/types";

export interface AnchorLayerSettings {
    start: AnchorPoint | null;
    end: AnchorPoint | null;
    mergeResults?: boolean;
}
