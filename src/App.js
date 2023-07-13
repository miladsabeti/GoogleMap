import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";
import { data } from "./mockData";
import Info from "./Info";

const containerStyle = {
  width: "100%",
  height: "100VH",
};
const position = {
  lat: 48.13877904209814,
  lng: 11.573061213028925,
};

export default function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.API_KEY,
  });

 

  return (
    <main>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: position.lat, lng: position.lng }}
          zoom={14}
        >
          {data.map((place) => (
            <MarkerF
              key={`${place.latitude}-${place.longitude}`}
              position={{
                lat: place.latitude,
                lng: place.longitude,
              }}
              onClick={() => {
                setSelectedPlace(place === selectedPlace ? null : place);
              }}
            />
          ))}
          {selectedPlace ? (
            <Info
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          ) : null}
        </GoogleMap>
      ) : null}
    </main>
  );
}