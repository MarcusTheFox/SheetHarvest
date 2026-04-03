export type ConstraintContext = {
  pattern?: string;
  flags?: string;
};

export type ValidatorFn = (value: unknown, constraint?: ConstraintContext) => boolean;

export const validators: Record<string, ValidatorFn> = {
  not_empty: (value) => {
    if (value === null || value === undefined) return false;
    return value.toString().trim().length > 0;
  },
  
  is_number: (value) => {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;
    const num = Number(value);
    return !isNaN(num) && value.trim() !== '';
  },
  
  is_date: (value) => {
    if (value instanceof Date) return !isNaN(value.getTime());
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.toString().trim() !== '';
  },

  regex: (value, constraint) => {
    const pattern = constraint?.pattern;
    if (!pattern || pattern === "") {
      return true;
    }

    const stringValue = value?.toString() ?? "";
    const flags = constraint?.flags ?? "";

    try {
      const re = new RegExp(pattern, flags);
      return re.test(stringValue);
    } catch {
      return false;
    }
  },

  any: () => true
};

export type ValidatorType = keyof typeof validators;