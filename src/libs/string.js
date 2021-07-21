export const strInclude = (str, includeText) => {
  if (!includeText) return true;
  return str.toLowerCase().includes(includeText);
}