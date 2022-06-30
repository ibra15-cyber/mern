import React, { useEffect, useRef } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef(); //connection

  const { center, zoom } = props; //object destructuring

  useEffect(() => {
    //render a map google
    // const map = new window.google.maps.Map(mapRef.current, {
    //   center: center,
    //   zoom: zoom,
    // });
    
    // const map = new window.mapboxgl.Map({
    //   center,
    //   zoom,
    // });
    let map = new window.mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13
    });

    //render a marker google
    // new window.google.maps.Marker({ position: center, map: map });

     //map box marker
  new window.mapboxgl.Marker().setLngLat([0, 0]).addTo(map);

  }, [center, zoom]);

 

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
