import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'



//28.595243025308104, 77.17092942570714

const PropertyMap = () => {

    const icon = L.icon({ 
        iconRetinaUrl:iconRetina, 
        iconUrl: iconMarker, 
        shadowUrl: iconShadow 
    });


  return (
    <div>
    <div className="">
        <MapContainer
          className="w-100"
          center={[28.595243025308104, 77.17092942570714]}
          zoom={15}
          style={{ width: "100vw", height: "50vh" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[28.595243025308104, 77.17092942570714]} icon={icon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;
