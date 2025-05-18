import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";

export default function CalendarUI() {
  const dispatch = useDispatch()

  const handleClick = (event) => {
    dispatch({type: "SELECTED_DAY", selectedDay:event})
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} style={{ overflow: "hidden" }}>
        <DatePicker label="Basic date picker" onChange={handleClick}/>
      </DemoContainer>
    </LocalizationProvider>
  );
}
