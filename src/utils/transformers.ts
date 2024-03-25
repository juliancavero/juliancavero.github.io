export const numberToCurrency = (number: number) => {
  return Number(Number(number).toFixed(2)).toLocaleString("de-DE");
};
export const transformDotToComma = (number: string) => {
  return number.replace(",", ".");
};
export const anyNumberRegex = /^[-]?\d*[.,]?\d*$/;
