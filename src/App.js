import React, { Component } from "react";
import SplitterLayout from "./components/SplitterLayout";

import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import OlLayerGroup from "ol/layer/Group";
import OlSourceTileJson from "ol/source/TileJSON";

import "./App.css";
import "ol/ol.css";
import "antd/dist/antd.css";

import { MapComponent, LayerTree, AgFeatureGrid } from "@terrestris/react-geo";

import { Collapse } from "antd";

const Panel = Collapse.Panel;

const text = `
  A dog is a type of  person.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const layerGroup = new OlLayerGroup({
  name: "Layergroup",
  layers: [
    new OlLayerTile({
      name: "Food insecurity layer",
      minResolution: 200,
      maxResolution: 2000,
      source: new OlSourceTileJson({
        url:
          "https://api.tiles.mapbox.com/v3/mapbox.20110804-hoa-foodinsecurity-3month.json?secure",
        crossOrigin: "anonymous"
      })
    }),
    new OlLayerTile({
      name: "World borders layer",
      minResolution: 2000,
      maxResolution: 20000,
      source: new OlSourceTileJson({
        url:
          "https://api.tiles.mapbox.com/v3/mapbox.world-borders-light.json?secure",
        crossOrigin: "anonymous"
      })
    })
  ]
});

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});

const center = [788453.4890155146, 6573085.729161344];

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16
  }),
  layers: [layer, layerGroup]
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.dragmap = this.dragmap.bind(this);
    this.state = {
      sidebarVisible: true
    };
    this.map = map;
  }
  dragmap() {
    // map.updateSize();
  }

  // componentDidMount() {
  // this.map = new Map({
  //   target: 'map',
  //   layers: [
  //     new TileLayer({
  //       source: new XYZ({
  //         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //       })
  //     })
  //   ],
  //   view: new View({
  //     center: [0, 0],
  //     zoom: 2
  //   })
  // });
  //this.map.updateSize();
  // }

  toggleSidebar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  }
  render() {
    return (
      <SplitterLayout
        primaryIndex={1}
        secondaryInitialSize={250}
        onDragEnd={this.dragmap}
        map={this.map}
      >
        <div className="my-pane">
          <Collapse accordion>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
        <SplitterLayout
          secondaryInitialSize={250}
          onDragEnd={this.dragmap}
          map={this.map}
        >
          <SplitterLayout
            vertical
            secondaryInitialSize={250}
            onDragEnd={this.dragmap}
            map={this.map}
          >
            <SplitterLayout
              secondaryInitialSize={250}
              onDragEnd={this.dragmap}
              map={this.map}
              isMap={true}
            >
              <MapComponent map={map} />
            </SplitterLayout>

            {this.state.sidebarVisible && (
              <SplitterLayout
                secondaryInitialSize={250}
                onDragEnd={this.dragmap}
              >
                <div className="my-pane">
                  <h2>3rd Pane</h2>
                  <p>This is the 3rd pane.</p>
                </div>
              </SplitterLayout>
            )}
            <SplitterLayout
              vertical
              secondaryInitialSize={250}
              onDragEnd={this.dragmap}
            >
              $<div>jkgdgkz</div>
            </SplitterLayout>
          </SplitterLayout>
        </SplitterLayout>
      </SplitterLayout>
    );
  }
}

export default App;
