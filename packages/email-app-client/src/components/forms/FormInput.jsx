import React from "react";
import { useField } from "formik";
import { InputLabel, Input, FormControl } from "@material-ui/core";

export const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { name, id } = props;
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={id || name}>{label || name}</InputLabel>
      <Input type="text" {...field} {...props} />
      {touched && error ? (
        <span style={{ color: "red", marginTop: "5px" }}>{error}</span>
      ) : null}
    </FormControl>
  );
};
