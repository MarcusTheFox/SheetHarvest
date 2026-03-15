import { PipelineContext } from "../../core";
import { checkConstraints } from "../../../extraction-utils";
import { LayerMetadata } from "../../types";

export const constraintsLayerMetadata: LayerMetadata<never> = {
    id: 'constraints',
    name: 'Типы данных',
    description: 'Валидирует данные в ячейках (числа, даты)',
    isSystem: true,
    layer: constraintsLayer,
}

export function constraintsLayer(context: PipelineContext): PipelineContext {
    const { rows, params } = context;
    return {
        ...context,
        rows: rows.filter(r => checkConstraints(r.cells, params.constraints))
    };
};
