export const validators = {
  not_empty: (value: any) => {
    if (value === null || value === undefined) return false;
    return value.toString().trim().length > 0;
  },
  
  is_number: (value: any) => {
    if (typeof value === 'number') return true;
    const num = Number(value);
    return !isNaN(num) && value !== '' && value !== null;
  },
  
  is_date: (value: any) => {
    if (value instanceof Date) return !isNaN(value.getTime());
    const date = new Date(value);
    return !isNaN(date.getTime()) && value !== '' && value !== null;
  },

  any: () => true
};