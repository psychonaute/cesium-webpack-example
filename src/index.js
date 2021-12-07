import {
    Viewer,
    Cartesian3,
    CesiumTerrainProvider,
    TileCoordinatesImageryProvider,
    WebMapTileServiceImageryProvider,
} from "cesium";

// import Cesium from "cesium";
import "cesium/Widgets/widgets.css";
import "../src/css/main.css"

var viewer = new Viewer("cesiumContainer", {
    requestRenderMode : true,
    maximumRenderTimeChange : Infinity,
    baseLayerPicker: false,
    terrainProvider : new CesiumTerrainProvider({
        url : 'http://localhost:4000/tilesets/srtm/' ,
        requestVertexNormals : true
    }),
    // timeline: false,
    // animation : false,
    showRenderLoopErrors: true
});

var layers = viewer.scene.imageryLayers;
layers.removeAll();

var scene = viewer.scene;
scene.debugShowFramesPerSecond = true;


// keep zoom level increment whole
// cf: https://groups.google.com/g/cesium-dev/c/eBgIKjw6HCE/m/XQEfZIZXWIwJ
viewer.scene.globe.maximumScreenSpaceError = 1;

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

