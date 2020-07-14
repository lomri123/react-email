import React from "react";
import { useField } from "formik";
import { InputLabel, Input, FormControl } from "@material-ui/core";

export const TextBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { name, id } = props;
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={id || name}>{id || name}</InputLabel>
      <Input multiline rows={10} {...field} {...props} />
      {touched && error ? error : null}
    </FormControl>
  );
};
