import { ChangeEvent, useState } from 'react';

type DynamicObject<T> = T & { [key: string]: string | number };

function useInput<T>(initialValue: DynamicObject<T>) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setValue({ ...initialValue, [e.currentTarget.name]: e.currentTarget.value });
  };

  return [value, onChange];
}

export default useInput;
