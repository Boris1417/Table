import dayjs from "dayjs";

const initaialState = {
  countries: [],
  selectedCountry: {
    active: true,
    country: "United States",
    icon: "https://api.apptica.com/static/images/geo/us.svg",
    id: 1,
    is_top_collected: true,
    locale: "en-us",
    name: "US",
    top_apps: true,
  },
  selectedDay: dayjs().subtract(30, "day"),
};

export const reducer = (state = initaialState, action) => {
  switch (action.type) {
    case "COUNTRIES":
      return { ...state, countries: action.countries.data };
    case "SELECTED_COUNTRY":
      return { ...state, selectedCountry: action.selectedCountry };
    case "SELECTED_DAY":
      return { ...state, selectedDay: action.selectedDay };
    default:
      return state;
  }
};
1;
