import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import ChartView from "./components/ChartView";
import Filter from "./components/Filter";

const App = () => {
  const [trips, setTrips] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [filters, setFilters] = useState({
    timeRange: { start: "", end: "" },
    fare: { min: 0, max: 100 },
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(fetchData)
      try {
        const response = await axios.get(
          "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
        );
        console.log(response)
        
        const filteredData = response.data.filter((trip) => {
          const fare = parseFloat(trip.fare_amount || 0);
          const tripTime = new Date(trip.pickup_datetime);
          return (
            fare >= filters.fare.min &&
            fare <= filters.fare.max &&
            (!filters.timeRange.start ||
              tripTime >= new Date(filters.timeRange.start)) &&
            (!filters.timeRange.end || tripTime <= new Date(filters.timeRange.end))
          );
        });

        // Update chart data
        const chartLabels = filteredData.map((trip) => trip.pickup_datetime);
        const chartDataPoints = filteredData.map((trip) =>
          parseFloat(trip.fare_amount || 0)
        );

        setTrips(filteredData);
        setChartData({ labels: chartLabels, data: chartDataPoints });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="app">
      <h1>NYC Taxi Trips</h1>
      <Filter filters={filters} setFilters={setFilters} />
      <div className="content">
        <MapView trips={trips} />
        <ChartView chartData={chartData} />
      </div>
    </div>
  );
};

export default App;
