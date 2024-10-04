import React from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ paymentHistory }) {
  let paymentDates = [];
  let paymentReceived = [];

  for (let i = 0; i < paymentHistory.length; i++) {
    const datePaid = new Date(paymentHistory[i].datePaid);
    paymentDates.push(datePaid.toISOString()); // Use ISO format
    paymentReceived.push(paymentHistory[i].amountPaid);
  }

  const series = [
    {
      name: "Payment Received",
      data: paymentReceived,
    },
  ];

  const options = {
    chart: {
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: paymentDates.map((date) => {
        return new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });
      }),
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `${value / 1000}k`;
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM", // Updated tooltip format
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        width: '90%',
        margin: '10px auto',
        padding: '10px'
      }}
    >
      <br />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
}

export default Chart;
