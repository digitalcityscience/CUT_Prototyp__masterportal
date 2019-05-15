import SnippetModel from "../model";
import ValueModel from "./valuemodel";

const SliderModel = SnippetModel.extend(/** @lends SliderModel.prototype */{
    /**
     * @class SliderModel
     * @extends SnippetModel
     * @memberof Snippets.Slider
     * @constructs
     * @property {boolean} showValueBox=true Flag to show or to hide Textbox
     * @param {object} attributes Model to be used in this view
     * @fires Util#RadioRequestUtilSort
     * @listens Alerting#RadioTriggerAlertAlert
     */
    defaults: _.extend({}, SnippetModel.prototype.defaults, {
        showValueBox: true
    }),

    initialize: function (attributes) {
        var parsedValues;

        // parent (SnippetModel) initialize
        this.superInitialize();
        parsedValues = this.parseValues(attributes.values);
        this.addValueModels(_.min(parsedValues), _.max(parsedValues));
        if (this.has("preselectedValues")) {
            this.updateValues(this.get("preselectedValues"));
        }
        this.listenTo(this.get("valuesCollection"), {
            "change:value": function (model, value) {
                this.triggerValuesChanged(model, value);
                this.trigger("render");
            }
        });
    },

    /**
     * Add minValueModel and maxValueModel to valuesCollection
     * @param {number} min min
     * @param {number} max max
     * @returns {void}
     */
    addValueModels: function (min, max) {
        this.get("valuesCollection").add([
            new ValueModel({
                attr: this.get("name"),
                displayName: this.get("displayName") + " ab",
                value: min,
                type: this.get("type"),
                isMin: true
            }),
            new ValueModel({
                attr: this.get("name"),
                displayName: this.get("displayName") + " bis",
                value: max,
                type: this.get("type"),
                isMin: false
            })
        ]);
    },

    /**
     * Call the updateValueModel function and/or the updateMaxValueModel
     * trigger the valueChanged event on snippetCollection in queryModel
     * @param  {number | array} snippetValues - depending on slider type
     * @returns {void}
     */
    updateValues: function (snippetValues) {
        // range slider
        if (_.isArray(snippetValues) === true) {
            this.get("valuesCollection").at(0).setValue(snippetValues[0]);
            this.get("valuesCollection").at(1).setValue(snippetValues[1]);
        }
        // slider
        else {
            this.get("valuesCollection").at(0).setValue(snippetValues);
        }
    },

    /**
     * Returns an object with the slider name and its values
     * @return {object} - contains the selected values
     */
    getSelectedValues: function () {
        return {
            attrName: this.get("name"),
            type: this.get("type"),
            values: this.get("valuesCollection").pluck("value")
        };
    },

    /**
     * Parse strings into numbers if necessary
     * @param  {array} valueList valueList
     * @return {number[]} parsedValueList
     */
    parseValues: function (valueList) {
        var parsedValueList = [];

        _.each(valueList, function (value) {
            var val = value;


            if (_.isString(val)) {
                val = parseInt(val, 10);
            }
            parsedValueList.push(val);
        });

        return parsedValueList;
    },

    /**
     * Change the values by input from inputfields. Render change if enter is pressed
     * @fires Util#RadioRequestUtilSort
     * @param {number} minValue - input value min
     * @param {number} maxValue - input value max
     * @returns {void}
     */
    changeValuesByText: function (minValue, maxValue) {
        var min = minValue,
            max = maxValue,
            initValues = this.get("valuesCollection").pluck("initValue"),
            values,
            lastValues,
            type = this.getSelectedValues().type;

        // check if input is allowed
        if (min === "" && max !== "") {
            max = this.checkInvalidInput(this.parseValueToNumber(max, type), initValues[1]);
            min = initValues[0];
        }
        else if (min !== "" && max === "") {
            min = this.checkInvalidInput(this.parseValueToNumber(min, type), initValues[0]);
            max = initValues[1];
        }
        else {
            lastValues = this.get("valuesCollection").pluck("value");

            min = this.checkInvalidInput(this.parseValueToNumber(min, type), lastValues[0]);
            max = this.checkInvalidInput(this.parseValueToNumber(max, type), lastValues[1]);
        }

        values = [min, max];
        values = Radio.request("Util", "sort", values);

        this.updateValues(values);

        return values;
    },

    /**
     * Converts number to integer or decimal by type
     * @param {number} inputValue - input value
     * @param {String} type - input type
     * @returns {void} value
    */
    parseValueToNumber: function (inputValue, type) {
        var value = _.isUndefined(inputValue) ? NaN : inputValue;

        if (type === "integer") {
            value = parseInt(value, 10);
        }
        else if (type === "decimal") {
            value = parseFloat(value);
        }
        else {
            value = NaN;
        }

        return value;
    },

    /**
    * Check if value is valid parameter or set value to initValue
    * @param {number} value - input value
    * @param {number} otherValue - value that be set if param value NaN
    * @returns {number} val
    */
    checkInvalidInput: function (value, otherValue) {
        var val = value;

        if (_.isNaN(val)) {
            val = otherValue;
            this.errorMessage();
        }

        return val;
    },

    /**
     * Returns an error message for invalid inputs
     * @listens Alerting#RadioTriggerAlertAlert
     * @returns {void}
     */
    errorMessage: function () {
        Radio.trigger("Alert", "alert", {
            text: "<strong>Fehlerhafte Eingabe,"
                + " Bitte eine ganze Zahl eingeben!</strong>",
            kategorie: "alert-danger"
        });
    },

    /**
     * Setter for defaultWidth
     * @param {integer} value defaultWidth
     * @returns {void}
     */
    setDefaultWidth: function (value) {
        this.set("defaultWidth", value);
    }
});

export default SliderModel;
