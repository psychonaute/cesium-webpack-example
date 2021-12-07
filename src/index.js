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

var scene = viewer.scene;
scene.debugShowFramesPerSecond = true;

var tileset;

var viewModel = {
    requestRenderMode: true,
    showTimeOptions: false,
    timeChangeEnabled: false,
    maximumRenderTimeChange: 0.0,
    lastRenderTime: "",
    requestRender: function () {
        scene.requestRender();
    },
};

// Clear scene and set default view.
var handler;
function resetScene() {
    viewer.trackedEntity = undefined;
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    viewer.scene.primitives.remove(tileset);
    viewer.clock.shouldAnimate = false;
    handler = handler && handler.destroy();
    scene.skyBox.show = true;
    scene.camera.flyHome(0.0);
    scene.requestRender();
    viewModel.showTimeOptions = false;
    viewModel.timeChangeEnabled = false;
    viewModel.maximumRenderTimeChange = 0;
}

