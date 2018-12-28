import ClickCounterModel from "./model";
const ClickCounterView = Backbone.View.extend(
    /** @lends ClickCounterView.prototype */
    {
        /**
         * @event ClickCounterView#RadioTriggerClickCounterToolChanged
         * @description Radio.trigger("ClickCounter", "toolChanged")
        */
        /**
         * @event ClickCounterView#RadioTriggerClickCounterCalcRoute
         * @description Radio.trigger("ClickCounter", "calcRoute")
        */
        /**
         * @event ClickCounterView#RadioTriggerClickCounterZoomChanged
         * @description Radio.trigger("ClickCounter", "zoomChanged")
        */
        /**
         * @event ClickCounterView#RadioTriggerClickCounterLayerVisibleChanged
         * @description Radio.trigger("ClickCounter", "layerVisibleChanged")
        */
        /**
         * @event ClickCounterView#RadioTriggerClickCounterGfi
         * @description Radio.trigger("ClickCounter", "gfi")
        */
        /**
        * @class ClickCounterView
        * @extends Backbone.View
        * @memberof ClickCounter
        * @constructs
        * @param {String} desktopURL [description]
        * @param {String} mobileURL  [description]
        * @listens ClickCounterView#RadioTriggerClickCounterToolChanged
        * @listens ClickCounterView#RadioTriggerClickCounterCalcRoute
        * @listens ClickCounterView#RadioTriggerClickCounterZoomChanged
        * @listens ClickCounterView#RadioTriggerClickCounterLayerVisibleChanged
        * @listens ClickCounterView#RadioTriggerClickCounterGfi
        */
        initialize: function (desktopURL, mobileURL) {
            var channel = Radio.channel("ClickCounter");

            this.model = new ClickCounterModel(desktopURL, mobileURL);

            channel.on({
                "toolChanged": this.registerClick,
                "calcRoute": this.registerClick,
                "zoomChanged": this.registerClick,
                "layerVisibleChanged": this.registerClick,
                "gfi": this.registerClick
            }, this);

            this.registerClick();
        },
        registerLayerEvent: function (layertree) {
            // fired beim LayerChange, Info-Button, Einstellungen auf dem Layertree
            if (layertree.length > 0) {
                layertree.click(function () {
                    this.registerClick();
                }.bind(this));
            }
        },

        /**
         * Refreshes iframe url
         * @return {void}
         */
        registerClick: function () {
            this.model.refreshIframe();
        }
    });

export default ClickCounterView;
