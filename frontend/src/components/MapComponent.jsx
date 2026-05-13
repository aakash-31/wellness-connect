import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map center changes
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

const MapComponent = ({ therapists }) => {
  const defaultCenter = [19.0760, 72.8777]; // Default to Mumbai

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {therapists.map((t) => (
          t.coordinates && (
            <Marker key={t._id} position={[t.coordinates.lat, t.coordinates.lng]}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-sm mb-1">{t.name}</h4>
                  <p className="text-xs text-on-surface-variant mb-2">{t.title}</p>
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                    <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    View Profile
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
