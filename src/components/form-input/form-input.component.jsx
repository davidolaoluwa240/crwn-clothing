// Modules
import React from "react";

// Style
import { FormInputLabel, Group, Input } from "./form-input.styles";

export const FormInput = ({ label, id, ...inputProps }) => {
  return (
    <Group>
      <Input id={id} {...inputProps} />
      {label && (
        <FormInputLabel htmlFor={id} shrink={inputProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
