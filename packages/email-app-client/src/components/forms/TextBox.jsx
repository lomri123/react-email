import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { InputLabel, Input, FormControl } from "@material-ui/core";

export const TextBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { name, id } = props;
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor={id || name}>{label || name}</InputLabel>
      <Input multiline rows={10} {...field} {...props} />
      {touched && error ? (
        <span style={{ color: "red", marginTop: "5px" }}>{error}</span>
      ) : null}
    </FormControl>
  );
};

TextBox.propTypes = {
  label: PropTypes.string,
};
