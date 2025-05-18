import dayjs from "dayjs";

export default function getDatesUpTo(selectedDay) {
  const today = dayjs();
  const startDate = dayjs(selectedDay);

  const diffInDays = today.diff(startDate, "day");

  if (diffInDays < 0 || diffInDays > 30) {
    console.log("Дата выходит за пределы диапазона, поменяйте дату");
    return [];
  }

  const dateArray = [];

  for (let i = 0; i <= diffInDays; i++) {
    const currentDate = startDate.add(i, "day");
    dateArray.push(currentDate.format("YYYY-MM-DD"));
  }

  return dateArray;
}

export const getRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  };