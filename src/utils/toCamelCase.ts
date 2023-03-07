export const toCamelCase = (s: string): string => {
  const components = s.toLowerCase().split("_");
  if(typeof components[0] === 'undefined') return s;
  return `${components[0].toLowerCase()}${components.slice(1).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join("")}`;
};