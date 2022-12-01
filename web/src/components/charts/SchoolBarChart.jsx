import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const [schoolAdmins, setSchoolAdmins] = useState([]);

  useEffect(() => {
    const getSchoolAdmins = async () => {
      const res = await axios.get("http://localhost:8000/api/users/school");
      setSchoolAdmins(res.data.users);
    };

    getSchoolAdmins();
  }, []);

  const options = {
    responsive: true,
    gridLine: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const labels = ["2020", "2021", "2022"];

  const data = {
    labels,
    datasets: [
      {
        label: "Posts and Clubs",
        data: [0, 0, `${schoolAdmins.length}`],
        backgroundColor: "rgb(95,158,160,0.7)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default BarChart;
