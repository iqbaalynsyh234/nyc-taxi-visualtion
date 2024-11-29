import React from "react";

const Filter = ({ filters, setFilters }) => {
  return (
    <div className="filter-container">
      <label>
        Time Range:
        <input
          type="datetime-local"
          value={filters.timeRange.start}
          onChange={(e) => setFilters({ ...filters, timeRange: { ...filters.timeRange, start: e.target.value } })}
        />
        <input
          type="datetime-local"
          value={filters.timeRange.end}
          onChange={(e) => setFilters({ ...filters, timeRange: { ...filters.timeRange, end: e.target.value } })}
        />
      </label>
      <label>
        Fare Range:
        <input
          type="number"
          value={filters.fare.min}
          onChange={(e) => setFilters({ ...filters, fare: { ...filters.fare, min: e.target.value } })}
        />
        <input
          type="number"
          value={filters.fare.max}
          onChange={(e) => setFilters({ ...filters, fare: { ...filters.fare, max: e.target.value } })}
        />
      </label>
    </div>
  );
};

export default Filter;
