import { FormControl, FormHelperText, Input, InputAdornment } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { currencyFormatter } from '../../utils/helpers/formatters';

const CurrencyField = ({ setCurrencyValue }: { setCurrencyValue: (value: number) => void }) => {
  const [money, setMoney] = useState('0');
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
        value={money}
      />
      <FormHelperText>{currencyFormatter(Number(money.replaceAll(',', '')))}</FormHelperText>
    </FormControl>
  );
};

export default CurrencyField;
