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
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("http://localhost:8000/api/users/student");
      setStudents(res.data.users);
    };

    getStudents();
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
    scale: {
      ticks: {
        precision: 0,
      },
    },
    maintainAspectRatio: false,
  };

  const labels = ["2020", "2021", "2022"];

  const data = {
    labels,
    datasets: [
      {
        label: "Total Students",
        data: [`${students.length}`, 0, 0],
        backgroundColor: "rgb(95,158,160,0.7)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;
