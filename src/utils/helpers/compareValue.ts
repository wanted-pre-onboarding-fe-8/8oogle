interface IcompareValue {
  currentValue: number;
  beforeValue: number;
}

function compareValue(
  currentValue: IcompareValue['currentValue'],
  beforeValue: IcompareValue['beforeValue'],
) {
  if (currentValue > beforeValue) {
    const biggerCurrentValue = (beforeValue / currentValue) * 100;
    return biggerCurrentValue;
  } else {
    const biggerBeforeValue = (currentValue / beforeValue) * 100;
    return biggerBeforeValue;
  }
}
export default compareValue;
