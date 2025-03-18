import { SyntheticEvent, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from './store';
import { InputValues } from '../types/types.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useForm = ({ inputValues }: { inputValues: InputValues }) => {
    const [values, setValues] = useState<InputValues>(inputValues);

    const handleChange = (
        event: SyntheticEvent & { target: HTMLInputElement },
    ) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
};
