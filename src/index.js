import * as Cesium from "cesium"

// import Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css"

// Create a viewer that won't render a new frame unless
// updates to the scene require it to reduce overall CPU usage.
var viewer = new Cesium.Viewer("cesiumContainer", {
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
    terrainProvider: Cesium.createWorldTerrain(),
  });

viewer.scene.debugShowFramesPerSecond = true;
// keep zoom level increment whole
// cf: https://groups.google.com/g/cesium-dev/c/eBgIKjw6HCE/m/XQEfZIZXWIwJ
viewer.scene.globe.maximumScreenSpaceError = 1;


var layers = viewer.scene.imageryLayers;
layers.removeAll();

var high_res = layers.addImageryProvider(new WebMapTileServiceImageryProvider({
    url : 'http://127.0.0.1:5000/qgis_generate/WMTS',
    layer : 'qgis_generate',
    style: 'default',
    format : 'image/jpg',
    tileMatrixSetID : 'GoogleMapsCompatible',
    maximumLevel: 14
}));

var tile_layer = layers.addImageryProvider(
    new TileCoordinatesImageryProvider()
);

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
    destination : Cartesian3.fromDegrees(41.59, 41.61, 9000),
    // orientation : {
    //   heading : Math.toRadians(0.0),
    //   pitch : Math.toRadians(-15.0),
    // }
  });

