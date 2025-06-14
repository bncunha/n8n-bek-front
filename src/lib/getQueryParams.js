export function getQueryParams(key) {
  const hash = window.location.hash.substring(1); // Remove the '#' symbol
  const params = new URLSearchParams(hash);
  const param = params.get(key);
  return param;
}
