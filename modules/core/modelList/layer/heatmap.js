define(function (require) {

    var Layer = require("modules/core/modelList/layer/model"),
        Radio = require("backbone.radio"),
        ol = require("openlayers"),
        Config = require("config"),
        HeatmapLayer;

    HeatmapLayer = Layer.extend({

        defaults: _.extend({}, Layer.prototype.defaults,
            {
                radius: 10,
                blur: 15,
                gradient: ["#00f", "#0ff", "#0f0", "#ff0", "#f00"]
            }
        ),

        initialize: function () {
            this.superInitialize();
            var channel = Radio.channel("HeatmapLayer");

            this.listenTo(channel, {
                "loadInitialData": this.loadInitialData,
                "loadupdateHeatmap": this.loadupdateHeatmap
            });
        },

        loadInitialData: function (layerId, features) {
            if (this.checkDataLayerId(layerId)) {
                this.initializeHeatmap(features);
            }
        },

        loadupdateHeatmap: function (layerId, feature) {
            if (this.checkDataLayerId(layerId)) {
                this.updateHeatmap(feature);
            }
        },

        /**
         * creates ol.source.Vector as LayerSource
         */
        createLayerSource: function () {
            this.setLayerSource(new ol.source.Vector());
        },

        /**
         * creates the heatmapLayer
         */
        createLayer: function () {
            this.setLayer(new ol.layer.Heatmap({
                source: this.getLayerSource(),
                name: this.get("name"),
                typ: this.get("typ"),
                id: this.getId(),
                weight: function (feature) {
                    return feature.get("normalizeWeightForHeatmap");
                },
                gfiAttributes: this.get("gfiAttributes"),
                blur: this.get("blur"),
                radius: this.get("radius"),
                gradient: this.get("gradient")
            }));
        },

       /**
         * check the triggered id with given the layerid
         * @param  {String} layerId
         */
        checkDataLayerId: function (layerId) {
            return this.get("dataLayerId") === layerId;
        },

        /**
         * draw heatmap with initialize features
         * @param  {[ol.Feature]} feature
         */
        initializeHeatmap: function (features) {
            // debugger;
            var attribute = this.get("attribute"),
                value = this.get("value"),
                layerSource = this.getLayerSource(),
                cloneFeatures = [];

            _.each(features, function (feature) {
                var cloneFeature = feature.clone();

                if (!_.isUndefined(attribute || value)) {
                     var count = this.countStates(feature, attribute, value);

                    cloneFeature.set("weightForHeatmap", count);
                }

                cloneFeature.setId(feature.getId());
                cloneFeatures.push(cloneFeature);
            }, this);

            layerSource.addFeatures(cloneFeatures);

            // normalize weighting
            if (!_.isUndefined(attribute || value)) {
                this.normalizeWeight(layerSource.getFeatures());
            }
        },

        /**
         * update the heatmap with given feature
         * @param  {ol.Feature} feature
         * @return {[type]}
         */
        updateHeatmap: function (feature) {
            var attribute = this.get("attribute"),
                value = this.get("value"),
                layerSource = this.getLayerSource(),
                featureId = feature.getId(),
                cloneFeature = feature.clone(),
                heatmapFeature;

            cloneFeature.setId(featureId);

            // check is feature exist
            _.each(layerSource.getFeatures(), function (feature) {
                if (feature.getId() === featureId) {
                    heatmapFeature = feature;
                }
            });

            // insert weighting
            if (!_.isUndefined(attribute || value)) {
                var count = this.countStates(feature, attribute, value);

                cloneFeature.set("weightForHeatmap", count);
            }

            // if the feature is new, then pushes otherwise change it
            if (_.isUndefined(heatmapFeature)) {
                layerSource.addFeature(cloneFeature);
            }
            else {
                layerSource.removeFeature(layerSource.getFeatureById(cloneFeature.getId()));
                layerSource.addFeature(cloneFeature);
            }

            // normalize weighting
            if (!_.isUndefined(attribute || value)) {
                this.normalizeWeight(layerSource.getFeatures());
            }
        },

        /**
         * normalizes the values to a scale from 0 to 1
         * @param  {[ol.Feature]} featuresWithValue
         * @return {[ol.Feature]} featuresWithValue
         */
        normalizeWeight: function (featuresWithValue) {
            var max = _.max(featuresWithValue, function (feature) {
                    return feature.get("weightForHeatmap");
                }).get("weightForHeatmap");

                _.each(featuresWithValue, function (feature) {
                    feature.set("normalizeWeightForHeatmap", (feature.get("weightForHeatmap") / max));
                });
        },

        /**
         * count given states of a feature
         * @param  {String} state
         * @return {[String]}
         */
        countStates: function (feature, heatmapAttribute, heatmapValue) {
            var state = String(feature.get(heatmapAttribute)),
                states,
                count;

            // split features with multiple values
            if (state.indexOf("|") !== -1) {
                states = state.split(" | ");
            }
            else {
                states = [state];
            }

            count = $.grep(states, function (state) {
                return state === heatmapValue;
            }).length;

            return count;
        },

        /**
         * Setter for attribute "layer"
         * @param {ol.layer} value
         */
        setLayer: function (value) {
            this.set("layer", value);
        },

        /**
         * Setter for attribute "layerSource"
         * @param {ol.source} value
         */
        setLayerSource: function (value) {
            this.set("layerSource", value);
        },

        /*
         * Getter for attribute "layerSource"
         * @return {ol.source}
        */
        getLayerSource: function () {
            return this.get("layerSource");
        }
    });

    return HeatmapLayer;
});
