import { FormControl, FormHelperText, Input, InputAdornment } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { currencyFormatter } from '../../utils/helpers/formatters';

const CurrencyField = ({
  setCurrencyValue,
  initialValue,
}: {
  setCurrencyValue: (value: number) => void;
  initialValue: number;
}) => {
  const init = initialValue || '';
  const [money, setMoney] = useState(`${init}`);
  return (
    <FormControl>
      <Input
        endAdornment={<InputAdornment position='end'>원</InputAdornment>}
        type='string'
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const currentValue = e.currentTarget.value;
          const removeCharacter = currentValue.replace(/[^0-9,]/g, '').replaceAll(',', '');
          const numberOfValue = Number(removeCharacter);
          setCurrencyValue(numberOfValue);
          setMoney(numberOfValue.toLocaleString());
        }}
        value={money || ''}
      />
      {money && (
        <FormHelperText>{currencyFormatter(Number(money.replaceAll(',', '')))}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CurrencyField;
