export const truncateTitle = (text?: string, maxLength: number = 70): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
