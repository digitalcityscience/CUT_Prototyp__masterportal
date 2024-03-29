<script>
import DefaultTheme from "../themes/default/components/DefaultTheme.vue";
import SensorTheme from "../themes/sensor/components/SensorTheme.vue";
import getTheme from "../../utils/getTheme";
import {mapActions, mapGetters, mapMutations} from "vuex";
import ToolWindow from "../../../../../share-components/ToolWindow.vue";

export default {
    name: "DetachedTemplate",
    components: {
        DefaultTheme,
        SensorTheme,
        ToolWindow
    },
    props: {
        feature: {
            type: Object,
            required: true
        },
        isUpdated: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            isContentHtml: false
        };
    },
    computed: {
        ...mapGetters("Maps", ["clickCoordinate", "getLayerById"]),
        ...mapGetters("Tools/Gfi", ["centerMapToClickPoint", "showMarker", "highlightVectorRules", "currentFeature", "hideMapMarkerOnVectorHighlight"]),

        /**
         * Returns the title of the gfi.
         * @returns {String} the title
         */
        title: function () {
            return this.feature.getTitle();
        },

        /**
         * Returns the theme in which the feature should be displayed.
         * It only works if the theme has the same name as the theme component, otherwise the default theme will be used
         * @returns {String} the name of the theme
         */
        theme: function () {
            return getTheme(this.feature.getTheme(), this.$options.components, this.$gfiThemeAddons);
        }
    },
    watch: {
        currentFeature: function () {
            this.highlightVectorFeature();
        }
    },
    created: function () {
        if (this.feature.getMimeType() === "text/html") {
            this.isContentHtml = true;
        }
        this.$on("hidemarker", () => {
            this.hideMarker();
        });
    },
    mounted: function () {
        this.highlightVectorFeature();
        this.setMarker();
    },
    updated: function () {
        if (this.isUpdated) {
            this.highlightVectorFeature();
            this.setMarker();
            this.$emit("updateFeatureDone");
        }
    },
    beforeDestroy: function () {
        this.removeHighlighting();
        this.removePointMarker();
    },
    methods: {
        ...mapMutations("Tools/Gfi", ["setShowMarker"]),
        ...mapActions("MapMarker", ["removePointMarker", "placingPointMarker"]),
        ...mapActions("Maps", ["highlightFeature", "removeHighlightFeature", "setCenter"]),
        close () {
            this.$emit("close");
        },

        /**
         * Sets the center of the view on the clickCoord and place the MapMarker on it
         * Set Marker and Center.
         * @returns {void}
         */
        setMarker () {
            if (this.showMarker) {
                if (this.centerMapToClickPoint) {
                    this.setCenter(this.clickCoordinate);
                }

                this.placingPointMarker(this.clickCoordinate);
            }
        },
        /**
         * Hides the map marker
         * @returns {void}
         */
        hideMarker () {
            this.setShowMarker(false);
        },
        /**
         * Highlights a vector feature
         * @returns {void}
         */
        highlightVectorFeature () {
            if (this.highlightVectorRules) {
                const layer = this.getLayerById({layerId: this.feature.getLayerId()}),
                    styleId = layer?.get("styleId");

                this.removeHighlighting();
                if (this.hideMapMarkerOnVectorHighlight) {
                    this.hideMarker();
                }

                if (this.feature.getOlFeature()?.getGeometry()?.getType() === "Point") {
                    this.highlightFeature({
                        feature: this.feature.getOlFeature(),
                        type: "increase",
                        scale: this.highlightVectorRules.image.scale,
                        layer: {id: this.feature.getLayerId()},
                        styleId
                    });
                }
                else if (this.feature.getOlFeature()?.getGeometry()?.getType() === "Polygon") {
                    this.highlightFeature({
                        feature: this.feature.getOlFeature(),
                        type: "highlightPolygon",
                        highlightStyle: {
                            fill: this.highlightVectorRules.fill,
                            stroke: this.highlightVectorRules.stroke
                        },
                        layer: {id: this.feature.getLayerId()},
                        styleId
                    });
                }
                else if (this.feature.getOlFeature()?.getGeometry()?.getType() === "MultiPolygon") {
                    this.highlightFeature({
                        feature: this.feature.getOlFeature(),
                        type: "highlightMultiPolygon",
                        highlightStyle: {
                            fill: this.highlightVectorRules.fill,
                            stroke: this.highlightVectorRules.stroke
                        },
                        layer: {id: this.feature.getLayerId()},
                        styleId
                    });
                }
                else if (this.feature.getOlFeature()?.getGeometry()?.getType() === "LineString") {
                    this.highlightFeature({
                        feature: this.feature.getOlFeature(),
                        type: "highlightLine",
                        highlightStyle: {
                            stroke: this.highlightVectorRules.stroke
                        },
                        layer: {id: this.feature.getLayerId()},
                        styleId
                    });
                }
            }
        },
        /**
         * Removes the feature highlighting
         * @returns {void}
         */
        removeHighlighting: function () {
            this.removeHighlightFeature();
        },

        /**
         * In case they key exists, returns its translation. In case the key doesn't exist returns the key.
         * @param {String} key the key to translate
         * @param {Object} [options=null] for interpolation, formating and plurals
         * @returns {String} the translation or the key itself
         */
        translate (key, options = null) {
            if (i18next.exists(key)) {
                return this.$t(key, options);
            }

            return key;
        }
    }
};
</script>

<template>
    <ToolWindow
        :focus-to-close-icon="true"
        @close="close"
    >
        <template #title>
            <span>{{ translate(title) }}</span>
        </template>
        <template #body>
            <component
                :is="theme"
                :feature="feature"
            />
            <slot name="footer" />
        </template>
    </ToolWindow>
</template>
