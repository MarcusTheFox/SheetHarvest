export const validators = {
  not_empty: (value: unknown) => {
    if (value === null || value === undefined) return false;
    return value.toString().trim().length > 0;
  },
  
  is_number: (value: unknown) => {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;
    const num = Number(value);
    return !isNaN(num) && value.trim() !== '';
  },
  
  is_date: (value: unknown) => {
    if (value instanceof Date) return !isNaN(value.getTime());
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.toString().trim() !== '';
  },

  any: () => true
};

export type ValidatorType = keyof typeof validators;