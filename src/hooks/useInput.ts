import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, SetStateAction, useState, Dispatch } from 'react';

type ReturnTypes<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void,
];

function useInput<T>(initialValue: T): ReturnTypes<T> {
  const [values, setValues] = useState<T>(initialValue);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ): void => {
    e.preventDefault();
    const key = e.target.name as keyof T;
    const value: string | number = e.target.value;
    setValues({
      ...initialValue,
      [key]: value,
    });
  };

  return [values, setValues, onChange];
}

export default useInput;
