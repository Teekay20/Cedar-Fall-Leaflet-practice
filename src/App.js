import "leaflet/dist/leaflet.css";
import "./styles.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { useState, useRef } from "react";

// Create a custom marker icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6063/6063856.png", // Custom icon URL
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -38],
  className: "custom-marker",
});

// Custom cluster icon creation function
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount();
  const color = count < 5 ? "#ff6b6b" : count < 10 ? "#ffcc00" : "#28a745";
  return L.divIcon({
    html: `<div class="cluster-icon" style="background-color: ${color};">${count}</div>`,
    className: "custom-cluster-icon",
    iconSize: [40, 40],
  });
};

// Pan-to-location component
function PanToLocation({ center }) {
  const map = useMap();
  map.setView(center, 16, { animate: true, pan: { duration: 1 } });
  return null;
}

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markerRefs = useRef([]);

  const locations = [
    {
      geocode: [42.5151, -92.4668],
      popUp: "University of Northern Iowa",
      img: "https://www.commonapp.org/static/f29b1a1cf6aff2dd7c6fca888dc5f4b3/university-northern-iowa_817.jpg",
    },
    {
      geocode: [42.518, -92.4605],
      popUp: "Geography Department, University of Northern Iowa",
      img: "https://i.ytimg.com/vi/ZLQe41wkr6A/maxresdefault.jpg",
    },
    {
      geocode: [42.5275, -92.4459],
      popUp: "Botanical Garden, University of Northern Iowa",
      img: "https://chas.uni.edu/sites/default/files/carousel-images/carousel-2.jpg",
    },
    {
      geocode: [42.526, -92.444],
      popUp: "Rod Library, University of Northern Iowa",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxQd9mxSneT9onwogAHvyG3h78ZBDzGHkyA&s",
    },
    {
      geocode: [42.5265, -92.4568],
      popUp: "UNI High School",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7fg5I2YeqoguINXpQl6Z-sZNPuAUSm2ptug&s",
    },
    {
      geocode: [42.5173, -92.4587],
      popUp: "MercyOne Cedar Falls Medical Center",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFiyI1n8TLk1VJ7HyVdWrW9fmlniIThxSw-Q&s",
    },
    {
      geocode: [42.517, -92.457],
      popUp: "Cedar Falls International Students Office",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoIABmRzyeiXhJz1yUEWz3FZT1oty9IT-RQ&s",
    },

    {
      geocode: [42.509, -92.4425],
      popUp: "Cedar Falls Public Library",
      img: "https://cedarfallslibrary.org/wp-content/uploads/2023/06/cedar-falls-public-library-entrance-2023.jpg",
    }, // Updated correct image
    {
      geocode: [42.5212, -92.4552],
      popUp: "Cedar Falls Community Center",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDs8CTkwz_F-JRktHvZSSx5IjYGq8kI1LO7g&s",
    }, // Fixed image link
    {
      geocode: [42.5234, -92.458],
      popUp: "Prairie Lakes Park",
      img: "https://www.cedarfallstourism.org/webres/Image/Tiles-Categories-and-Features/Category-Tiles/Park-Prairie-Lakes-Shelter-on-trail-Cedar-Falls-Iowa.jpg",
    },
    {
      geocode: [42.5218, -92.4671],
      popUp: "Cedar Falls City Hall",
      img: "https://www.cedarfallstourism.org/webres/Image/Tiles-Categories-and-Features/Category-Tiles/City-Hall-Cedar-Falls-Iowa.jpg",
    },
    {
      geocode: [42.5335, -92.4479],
      popUp: "Sartori Memorial Hospital",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5pOX67LfoJBST6JMFqKBUEmOIoCXvN-XT1w&s",
    },
    {
      geocode: [42.523, -92.445],
      popUp: "Cedar Falls Downtown",
      img: "https://www.cedarfallstourism.org/webres/Image/Tiles-Categories-and-Features/Category-Tiles/Downtown-Gallery-South-two-Cedar-Falls-Iowa.jpg",
    },
    {
      geocode: [42.526, -92.469],
      popUp: "Cedar Falls Water Park",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYzFyjQAw-8lDeOYCRKKlP0vFdLmUHl3jejw&s",
    },
  ];

  const handleClickLocation = (marker) => {
    setSelectedLocation(marker.geocode);
    const markerRef = markerRefs.current[locations.indexOf(marker)];
    markerRef.openPopup();
  };

  return (
    <div>
      <div className="legend">
        <h3>Locations</h3>
        <ul>
          {locations.map((marker, index) => (
            <li
              key={index}
              onClick={() => handleClickLocation(marker)}
              style={{ cursor: "pointer" }}
            >
              {marker.popUp}
            </li>
          ))}
        </ul>
      </div>

      <MapContainer
        center={[42.5278, -92.4455]} // Default center if no location is selected
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {locations.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode}
              icon={customIcon}
              ref={(el) => (markerRefs.current[index] = el)}
            >
              <Popup>
                <div style={{ textAlign: "center", maxWidth: "220px" }}>
                  <h3 style={{ fontSize: "16px", margin: "5px 0" }}>
                    {marker.popUp}
                  </h3>
                  <img
                    src={marker.img}
                    alt={marker.popUp}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      padding: "5px",
                      backgroundColor: "#fff",
                    }}
                  />
                  <p>
                    <a
                      href={marker.img}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View More
                    </a>
                  </p>
                </div>
              </Popup>
              <Tooltip>{marker.popUp}</Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Pan map to the selected location */}
        {selectedLocation && <PanToLocation center={selectedLocation} />}
      </MapContainer>
    </div>
  );
}
