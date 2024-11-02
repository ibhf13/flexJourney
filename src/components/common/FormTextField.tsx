import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface FormTextFieldProps extends Omit<TextFieldProps, 'name'> {
    name: string;
    control: Control<any>;
    rules?: RegisterOptions;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
    name,
    control,
    rules,
    ...textFieldProps
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    {...textFieldProps}
                    error={!!error}
                    helperText={error?.message}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (textFieldProps.type === 'number') {
                            field.onChange(value === '' ? '' : Number(value));
                        } else {
                            field.onChange(value);
                        }
                    }}
                />
            )}
        />
    );
};