import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectInput = ({ label, options, onchange, value }) => {
  const handleChange = (event) => {
    onchange(event.target.value);
  };
  return (
    <div>
      <FormControl variant="filled" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          defaultValue={""}
          value={value ?? ""}
          onChange={handleChange}
          label={label}
          id="select-input"
        >
          {options.map((el, idx) => (
            <MenuItem key={idx} value={el.value}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
