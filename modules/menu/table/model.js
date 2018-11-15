const TableNavModel = Backbone.Model.extend({
    defaults: {
        isActiveElement: ""
    },
    initialize: function () {
        var channel = Radio.channel("TableMenu");

        channel.reply({
            "getActiveElement": function () {
                return this.get("isActiveElement");
            },
            "setActiveElement": this.setActiveElement
        }, this);
        this.listenTo(channel, {
            "appendFilter": this.appendFilterContent
        });
    },

    setActiveElement: function (element) {
        var channel = Radio.channel("TableMenu");

        if (this.get("isActiveElement") !== element) {
            channel.trigger("hideMenuElement" + this.get("isActiveElement"));
        }
        this.set("isActiveElement", element);
    },
    appendFilterContent: function (element) {
        this.trigger("appendFilterContent", element);
    }
});

export default TableNavModel;
