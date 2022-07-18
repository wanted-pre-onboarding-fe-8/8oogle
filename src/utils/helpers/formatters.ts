export function moneyFormatter(value: number) {
  const result: number[] = [];
  let unit = 1e12; // billion

  while (unit > 1) {
    const quotient = value / unit;
    value %= unit;
    result.push(Math.trunc(quotient));
    unit /= 1000;
  }
  let realResult = '';
  const hh = ['조', '억', '백만', '천'];
  hh.forEach((h, idx) => {
    if (idx == 3) {
      if (result[idx] >= 10) {
        realResult += `${Math.trunc(result[idx] / 10)}만`;
        realResult += `${result[idx] % 10}천`;
      }
    } else {
      if (result[idx]) {
        realResult += `${result[idx]}${h}`;
      }
    }
  });
  realResult += `${value}원`;

  return realResult;
}
