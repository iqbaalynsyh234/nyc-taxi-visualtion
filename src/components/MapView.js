import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vehicleIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3203/3203071.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MapView = ({ trips }) => {
  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={12}
      className="leaflet-container dark-mode"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {trips.map((trip, index) => (
        <React.Fragment key={index}>
          {/* Garis antar lokasi */}
          <Polyline
            positions={[
              [trip.pickup_latitude, trip.pickup_longitude],
              [trip.dropoff_latitude, trip.dropoff_longitude],
            ]}
            color="#00BFFF"
            weight={3}
            opacity={0.8}
          >
            <Popup>
              <div className="popup-card">
                <h3>Trip Details</h3>
                <p><strong>Fare:</strong> ${trip.fare_amount}</p>
                <p><strong>Distance:</strong> {trip.trip_distance} miles</p>
                <p><strong>Pickup:</strong> ({trip.pickup_latitude}, {trip.pickup_longitude})</p>
                <p><strong>Dropoff:</strong> ({trip.dropoff_latitude}, {trip.dropoff_longitude})</p>
              </div>
            </Popup>
          </Polyline>

          {/* Pickup Marker */}
          <Marker
            position={[trip.pickup_latitude, trip.pickup_longitude]}
            icon={vehicleIcon}
          >
            <Popup>
              <div className="popup-card">
                <h3>Pickup Location</h3>
                <p>Latitude: {trip.pickup_latitude}</p>
                <p>Longitude: {trip.pickup_longitude}</p>
              </div>
            </Popup>
          </Marker>

          {/* Dropoff Marker */}
          <Marker
            position={[trip.dropoff_latitude, trip.dropoff_longitude]}
            icon={vehicleIcon}
          >
            <Popup>
              <div className="popup-card">
                <h3>Dropoff Location</h3>
                <div className="scrollable-popup">
                  <p><strong>Fare:</strong> ${trip.fare_amount}</p>
                  <p><strong>Distance:</strong> {trip.trip_distance} miles</p>
                  <p><strong>Pickup:</strong> ({trip.pickup_latitude}, {trip.pickup_longitude})</p>
                  <p><strong>Dropoff:</strong> ({trip.dropoff_latitude}, {trip.dropoff_longitude})</p>
                  <p><strong>Vendor ID:</strong> {trip.vendor_id}</p>
                  <p><strong>Pickup Time:</strong> {new Date(trip.pickup_datetime).toLocaleString()}</p>
                  <p><strong>Dropoff Time:</strong> {new Date(trip.dropoff_datetime).toLocaleString()}</p>
                  <p><strong>Passenger Count:</strong> {trip.passenger_count}</p>
                  <p><strong>Payment Type:</strong> {trip.payment_type}</p>
                  <p><strong>Tip Amount:</strong> ${trip.tip_amount}</p>
                  <p><strong>Tolls Amount:</strong> ${trip.tolls_amount}</p>
                  <p><strong>Total Amount:</strong> ${trip.total_amount}</p>
                  <p><strong>MTA Tax:</strong> ${trip.mta_tax}</p>
                  <p><strong>Imp Surcharge:</strong> ${trip.imp_surcharge}</p>
                  <p><strong>Rate Code:</strong> {trip.rate_code}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapView;
