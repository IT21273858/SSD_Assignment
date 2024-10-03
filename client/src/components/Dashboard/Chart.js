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
      type: "datetime",
      categories: paymentDates, // Use ISO formatted dates
    },
    tooltip: {
      x: {
        format: "dd/MM/yy", // This can remain as is for tooltip formatting
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
