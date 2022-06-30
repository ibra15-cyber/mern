// import mapboxgl from "mapbox-gl";

const Map3 = () => {

    // mapboxgl.accessToken =
    // "pk.eyJ1IjoibnlhcnMxNSIsImEiOiJjbDQ3aDJ0ZGswaWdxM2puMmY0ejJncHM1In0.p4l9gFnRlK5Btrmj3VRfSw";


    const map = new window.mapboxgl.Map({
        container: "map", // HTML container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-21.92661562, 64.14356426], // starting position as [lng, lat]
        zoom: 13,
      });

      const popup = new window.mapboxgl.Popup().setHTML(
        `<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>`
      );

      // Add zoom and rotation controls to the map.
        map.addControl(new window.mapboxgl.NavigationControl());

      const marker = new window.mapboxgl.Marker()
        .setLngLat([-21.92661562, 64.14356426])
        .setPopup(popup)
        .addTo(map);

}

export default Map3