import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function SelectUI() {
  const [selectedCountry, setSelectedCountry] = useState("")

  const countries = useSelector((state) => state.countries);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    dispatch({ type: "SELECTED_COUNTRY", selectedCountry: event.target.value });
  };

  return (
    <Box
      sx={{ minWidth: 120 }}
      style={{ height: "50px", marginBottom: "-2px" }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCountry}
          label="Country"
          onChange={handleChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country}> 
              <img src={`${country.icon}`} />
              {'\u00A0'}
              {'\u00A0'}
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
