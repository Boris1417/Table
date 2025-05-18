import "./App.css";
import { LineChart } from "./components/table/table";
import { HeaderTable } from "./components/headerTable/headerTables";
import { createStore } from "@reduxjs/toolkit";
import { reducer } from "./redux/redux";
import { Provider } from "react-redux";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <div style={{maxWidth:"1000px", minWidth:"375px"}}>
      <Provider store={store}>
        <HeaderTable />
        <LineChart />
      </Provider>
    </div>
  );
}

export default App;
