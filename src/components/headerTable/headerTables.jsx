import { useEffect } from "react";
import { getInfoOf, urls } from "../../api/fetch";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import SelectUI from "../UI/SelectUI/SelectUI";
import CalendarUI from "../UI/CalendarUI/CalendarUI";
import "./headerTable.scss";
import { useDispatch } from "react-redux";

export const HeaderTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const wrapper = async () => {
      const countries = await getInfoOf(urls.Countries);
      dispatch({ type: "COUNTRIES", countries: countries });
    };
    wrapper();
  });

  return (
    <div className="container">
      <div className="label">Top History</div>
      <ButtonUI>PNG</ButtonUI>
      <ButtonUI>CSV</ButtonUI>
      <SelectUI></SelectUI>
      <CalendarUI></CalendarUI>
    </div>
  );
};
