import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = (props) => {
  mapboxgl.accessToken =
  "pk.eyJ1IjoibnlhcnMxNSIsImEiOiJjbDQ3aDJ0ZGswaWdxM2puMmY0ejJncHM1In0.p4l9gFnRlK5Btrmj3VRfSw";
  const mapRef = useRef(); //connection

  const {center, zoom} = props; //object destructuring

  useEffect(() => {
      //render a map
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    // const map = new mapboxgl.Map(mapRef.current, {
    //   center: center,
    //   // container: "map",
    //   // style: "mapbox://styles/mapbox/streets-v11",
    //   zoom: zoom,
    // });

      //render a marker
    new window.google.maps.Marker({ position: center, map: map });
    // new mapboxgl.Marker().setLngLat(center).addTo(map);

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
