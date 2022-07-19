import { A_TRILLION, A_BILLION, TEN_THOUSAND } from '../constants/currency';

export function currencyFormatter(value: number) {
  let formattedValue = '';
  const unitOfCurrency = [A_TRILLION, A_BILLION, TEN_THOUSAND];
  const koreanCurrency = ['조', '억', '만'];

  unitOfCurrency.forEach((currency, idx) => {
    if (value > currency) {
      const quotient = Math.trunc(value / currency);
      formattedValue += quotient + koreanCurrency[idx];
      value %= currency;
    }
  });

  formattedValue += value + '원';

  return formattedValue;
}
