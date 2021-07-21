export const delayBounceFn = (fn, timer) => {
  const delayDebounceFn = setTimeout(fn, timer)
  return () => clearTimeout(delayDebounceFn);
}