import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { colorConfig } from '../../../utils';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

const TourMap = ({ locations, season }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mstgh/ck2cypjah0wqg1cmtjyajfps3',
      scrollZoom: false
    });
    // Display Area
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
      // 1) Create the marker
      const el = document.createElement('i');
      el.className = `map marker alternate huge icon ${colorConfig[season][2]}`;
      // el.style.backgroundImage = `url('${process.env.PUBLIC_URL}/img/icons/pin.png')`

      // 2) Add marker to the map
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      // 3) Add popup the the marker
      new mapboxgl.Popup({
        offset: 30
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      // 4) Extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });

    // Finally fit the bounds inside of the map! (:
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        right: 100,
        bottom: 150,
        left: 100
      }
    });
  }, [locations, season]);

  return (
    <section className="section-map">
      <div id="mapContainer" ref={mapContainer}></div>
    </section>
  );
};

export default TourMap;
