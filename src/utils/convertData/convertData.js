export function convertData(fields) {
  const fieldNames = Object.keys(fields);
  const result = fieldNames.reduce((accumulator, fieldName) => {
    const fieldValue = fields[fieldName].value;
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((file) => accumulator.append(fieldName, file));
    } else {
      accumulator.append(fieldName, fieldValue);
    }
    return accumulator;
  }, new FormData());
  return result;
}
