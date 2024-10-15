export function getUpdatedFields<T extends Record<string, any>>(newData: T, oldData: T): Partial<T> {
  let updatedFields: Partial<T> = {};

  (Object.keys(newData) as (keyof T)[]).forEach((key) => {
    const newValue = newData[key];
    const oldValue = oldData[key];

    if (newValue !== null && newValue !== undefined && newValue !== oldValue) {
      updatedFields[key] = newValue;
    }
  });

  return updatedFields;
}
