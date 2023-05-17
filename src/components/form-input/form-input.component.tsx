// Modules
import React, { FC, InputHTMLAttributes } from "react";

// Style
import { FormInputLabel, Group, Input } from "./form-input.styles";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({ label, id, ...inputProps }) => {
  return (
    <Group>
      <Input id={id} {...inputProps} />
      {label && (
        <FormInputLabel
          htmlFor={id}
          shrink={Boolean(
            inputProps.value &&
              typeof inputProps.value === "string" &&
              inputProps.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
