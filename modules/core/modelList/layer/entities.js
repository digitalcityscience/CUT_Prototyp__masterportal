import Layer from "./model";

const EntitiesLayer = Layer.extend({
    defaults: _.extend({}, Layer.prototype.defaults, {
        supported: ["3D"],
        showSettings: false
    }),
    initialize: function () {
        this.listenToOnce(this, {
            "change:isSelected": function () {
                this.toggleLayerOnMap();
            }
        });
        this.listenTo(this, {
            "change:isVisibleInMap": function () {
                Radio.trigger("ClickCounter", "layerVisibleChanged");
                this.toggleLayerOnMap();
            }
        });

        this.listenTo(Radio.channel("Map"), {
            "change": function (mode) {
                if (mode === "3D") {
                    this.setIsSelected(true);
                }
                else {
                    this.setIsSelected(false);
                }
            }
        });
        if (this.get("isSelected") === true || Radio.request("Parser", "getTreeType") === "light") {
            if (Radio.request("Map", "isMap3d") === true) {
                this.toggleLayerOnMap();
            }
            else {
                this.listenToOnce(Radio.channel("Map"), {
                    "change": function (value) {
                        if (value === "3D") {
                            this.toggleLayerOnMap();
                        }
                    }
                });
            }
        }
    },

    /**
     * toggles the layer and creates the necessary resources and adds it to the 3d map
     * @returns {void}
     */
    toggleLayerOnMap: function () {
        if (Radio.request("Map", "isMap3d") === true) {
            const map3d = Radio.request("Map", "getMap3d"),
                datasource = this.get("customDatasource");

            if (!this.has("customDatasource")) {
                this.createCustomDatasource();
            }

            if (!map3d.getDataSources().contains(datasource)) {
                map3d.getDataSources().add(datasource);
            }

            if (this.get("isVisibleInMap") === true) {
                datasource.show = true;
            }
            else {
                datasource.show = false;
            }
        }
    },

    /**
     * creates the datasource collection for this layer
     * @returns {void} -
     */
    createCustomDatasource: function () {
        if (this.has("customDatasource") === false) {
            this.set("customDatasource", new Cesium.CustomDataSource());
            if (this.has("entities")) {
                const entities = this.get("entities");

                entities.forEach(this.addEntityFromOptions, this);
            }
        }
    },

    /**
     * adds an entity to this layer
     * Example modelOptions:
     * {
     *   "url": "https://hamburg.virtualcitymap.de/gltf/4AQfNWNDHHFQzfBm.glb",
     *   "attributes": {
     *     "name": "Fernsehturm.kmz"
     *   },
     *   "latitude": 53.541831,
     *   "longitude": 9.917963,
     *   "height": 10,
     *   "heading": -1.2502079000000208,
     *   "pitch": 0,
     *   "roll": 0,
     *   "scale": 5,
     *   "allowPicking": true,
     *   "show": true
     * }
     * returns the cesium Entity, see https://cesiumjs.org/Cesium/Build/Documentation/Entity.html?classFilter=entity
     *
     * @param {Object} model modelOptions
     * @returns {Cesium.Entity} cesium entity
     */
    addEntityFromOptions (model) {

        if (!_.isString(model.url)) {
            return null;
        }

        const areNumeric = [model.longitude, model.latitude, model.height].every(num => _.isNumber(num));

        if (!areNumeric) {
            return null;
        }

        const position = Cesium.Cartesian3.fromDegrees(model.longitude, model.latitude, model.height);

        let heading = 0,
            pitch = 0,
            roll = 0;

        if (_.isNumber(model.heading)) {
            heading = model.heading / 180 * Math.PI;
        }

        if (_.isNumber(model.pitch)) {
            pitch = model.pitch / 180 * Math.PI;
        }

        if (_.isNumber(model.roll)) {
            roll = model.roll / 180 * Math.PI;
        }
        const headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll);

        const modelOptions = Object.assign(model.modelOptions || {}, {
            uri: model.url,
            scale: _.isNumber(model.scale) ? model.scale : 1,
            show: true
        });

        const entityOptions = {
            name: model.url,
            position,
            orientation,
            show: _.isBoolean(model.show) ? model.show : true,
            model: modelOptions
        };

        const allowPicking = _.isBoolean(model.allowPicking) ? model.allowPicking : true;
        const attributes = model.attributes ? model.attributes : {};

        const entity = this.get("customDatasource").entities.add(entityOptions);
        entity.attributes = attributes;
        entity.allowPicking = allowPicking;
        return entity;
    },

    /**
     * Overrides setter from Parent Class
     * Setter for isVisibleInMap and setter for layer.setVisible
     * @param {Boolean} value Flag if layer is visible in Map
     * @returns {void}
     */
    setIsVisibleInMap: function (value) {
        this.set("isVisibleInMap", value);
    }
});

export default EntitiesLayer;