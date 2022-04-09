import react from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import BackToPage from "../Componentes/BackToPage";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { ProductContextState } from "../Context/Context";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);

const Chart = () => {
  const { datos } = ProductContextState();
  const dataArray = [];

  const cantidadesTotales = datos
    .map((element) => {
      return Number(element.Cantidad);
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  let cantidadesTotalesMarzo = cantidadesTotales;
  const arrayCantidades = [];

  //2628 Marzo

  arrayCantidades.push(cantidadesTotalesMarzo);

  const rodamientos = datos
    .filter((element) => element.Categoria === "Rodamientos")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(rodamientos);

  const aceites = datos
    .filter((element) => element.Categoria === "Aceites")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(aceites);

  const aerosoles = datos
    .filter((element) => element.Categoria === "Aerosol")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(aerosoles);

  const interruptores = datos
    .filter((element) => element.Categoria === "Interruptores")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(interruptores);

  const carbones = datos
    .filter((element) => element.Categoria === "Carbones")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(carbones);

  const estetica = datos
    .filter((element) => element.Categoria === "EsteticaAutomotor")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(estetica);

  const pegamentos = datos
    .filter((element) => element.Categoria === "Pegamentos")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(pegamentos);

  const plumita = datos
    .filter((element) => element.Categoria === "Plumita")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(plumita);

  const capacitores = datos
    .filter((element) => element.Categoria === "Capacitores")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(capacitores);

  const insumos = datos
    .filter((element) => element.Categoria === "Insumos")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(insumos);

  const herramientas = datos
    .filter((element) => element.Categoria === "Herramientas")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(herramientas);

  const motores = datos
    .filter((element) => element.Categoria === "Motores")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(motores);

  const repuestos = datos
    .filter((element) => element.Categoria === "Repuestos")
    .map((elemento) => {
      return Number(elemento.Cantidad);
    })
    .reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);

  dataArray.push(repuestos);

  const finalDataArray = dataArray.map((element) => {
    return Number((element * 100) / cantidadesTotales).toFixed(2);
  });

  const data = {
    labels: [
      "Rodamientos",
      "Aceites",
      "Aerosoles",
      "Interruptores",
      "Carbones",
      "EsteticaAutomotor",
      "Pegamentos",
      "Plumita",
      "Capacitores",
      "Insumos",
      "Herramientas",
      "Motores",
      "Repuestos",
    ],
    datasets: [
      {
        label: "Cantidad de productos",
        data: [
          rodamientos,
          aceites,
          aerosoles,
          interruptores,
          carbones,
          estetica,
          pegamentos,
          plumita,
          capacitores,
          insumos,
          herramientas,
          motores,
          repuestos,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.9)",
          "yellow",
          "rgba(39, 211, 3,0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgb(228, 105, 211)",
          "rgba(45, 99, 202,0.9)",
          "rgba(6, 209, 178,0.9)",
          "rgba(239, 150, 29,0.8)",
          "rgb(215, 30, 78)",
          "rgba(203, 247, 82,0.8)",
          "rgba(250, 186, 10,0.9)",
          "rgba(16, 87, 72,0.9)",
        ],
        borderColor: [
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataTwo = {
    labels: [
      "Rodamientos",
      "Aceites",
      "Aerosoles",
      "Interruptores",
      "Carbones",
      "EsteticaAutomotor",
      "Pegamentos",
      "Plumita",
      "Capacitores",
      "Insumos",
      "Herramientas",
      "Motores",
      "Repuestos",
    ],
    datasets: [
      {
        label: "Cantidades segun %",
        data: finalDataArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.9)",
          "yellow",
          "rgba(39, 211, 3,0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgb(228, 105, 211)",
          "rgba(45, 99, 202,0.9)",
          "rgba(6, 209, 178,0.9)",
          "rgba(239, 150, 29,0.8)",
          "rgb(215, 30, 78)",
          "rgba(203, 247, 82,0.8)",
          "rgba(250, 186, 10,0.9)",
          "rgba(16, 87, 72,0.9)",
        ],
        borderColor: [
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
          "rgba(22,22,22,0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const labels = [
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const state = {
    labels,
    datasets: [
      {
        label: "Cantidades por mes",
        data: arrayCantidades,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  const optionsTwo = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className="display">
      <h1>Graficos</h1>

      <div className="chart-procontainer">
        <div className="chart-container">
          <h2>Grafico de productos por cantidad</h2>
          <Doughnut options={options} data={data} />
        </div>
        <div className="chart-container">
          <h2>Grafico de productos por mes(en proceso)</h2>
          <Line data={state} options={optionsTwo} />
        </div>
        <div className="chart-container">
          <h2>Grafico de cantidades segun porcentaje</h2>
          <Pie data={dataTwo} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
