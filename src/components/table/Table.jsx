import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { getDataOfTable, getCathegories } from "../../api/fetch";
import dayjs from "dayjs";
import getDatesUpTo, { getRandomColor } from "../../utils";
import { Checkbox } from "../CheckBox/CheckBox";
import "./table.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const def = {
  1: "Top Free",
  2: "Top Paid",
  3: "Top Grossing",
  4: "Top Free",
  5: "Top Paid",
  6: "Top Grossing",
  7: "New Free",
  8: "New Paid",
  9: "Trending",
};


export const LineChart = () => {
  const selectedDay = useSelector((state) => state.selectedDay);
  const selectedCountry = useSelector((state) => state.selectedCountry);

  const [days, setDays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tableInfo, setTableInfo] = useState({});
  const [selectedLines, setSelectedLines] = useState({});


  useEffect(() => {
    const wrapper = async () => {
      const response = await getCathegories();
      setCategories(response.data || []);
    };
    wrapper();
  }, []);


  useEffect(() => {
    const arrDays = getDatesUpTo(selectedDay);
    setDays(arrDays);
  }, [selectedDay]);


  useEffect(() => {
    const wrapper = async () => {
      const response = await getDataOfTable(
        selectedCountry.id,
        selectedDay.format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      );
      setTableInfo(response.data || {});
    };
    wrapper();
  }, [selectedCountry, selectedDay]);

  const [dataForChart, setDataForChart] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const categoryNames = categories.reduce((acc, cat) => {
      acc[cat.id] = cat.name;
      return acc;
    }, {});

    const newDatasets = [];

    Object.entries(tableInfo).forEach(([categoryId, types]) => {
      if (!categoryNames[categoryId]) {
        console.warn(`Категория с ID "${categoryId}" не найдена в списке`);
        return;
      }

      Object.entries(types).forEach(([typeId, dateValues]) => {
        if (!def[typeId]) {
          console.warn(`Тип рейтинга с ID "${typeId}" не найден в def`);
          return;
        }

        const dataForLine = days.map((day) => dateValues[day] ?? null);

        newDatasets.push({
          label: `${categoryNames[categoryId]} - ${def[typeId]}`,
          data: dataForLine,
          borderColor: getRandomColor(),
          tension: 0.2,
          pointRadius: 0,
        });
      });
    });

    setDataForChart({
      labels: days,
      datasets: newDatasets,
    });

    const initialSelection = {};
    newDatasets.forEach((dataset) => {
      initialSelection[dataset.label] = true;
    });
    setSelectedLines(initialSelection);
  }, [days, categories, tableInfo]);

  const toggleLine = (label) => {
    setSelectedLines((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const filteredDatasets = dataForChart.datasets.filter(
    (dataset) => selectedLines[dataset.label]
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
        },
      },
    },
  };

  const chartData = {
    labels: days,
    datasets: filteredDatasets,
  };

  return (
    <>
      <Line data={chartData} options={chartOptions} />
      <div className="wrapper">
        {dataForChart.datasets.map((dataset) => (
          <Checkbox
            key={dataset.label}
            label={dataset.label}
            color={dataset.borderColor}
            checked={!!selectedLines[dataset.label]}
            onChange={() => toggleLine(dataset.label)}
          />
        ))}
      </div>
    </>
  );
};

