import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { InputLabel, TextField, FormControl } from "@material-ui/core";

export const TextBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { name, id } = props;
  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        multiline
        rows={10}
        label={label || name}
        name={name}
        {...field}
        {...props}
      />
      {touched && error ? (
        <span style={{ color: "red", marginTop: "5px" }}>{error}</span>
      ) : null}
    </FormControl>
  );
};

TextBox.propTypes = {
  label: PropTypes.string,
};
