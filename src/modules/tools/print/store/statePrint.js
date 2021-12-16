/**
 * Print Tool
 * @typedef {Object} PrintState
 * @property {Boolean} active if true, print tool will rendered
 * @property {String} id id of the Print component
 * @property {String} name name of the print
 * @property {Object} printSettings print settings from the config.json
 * @property {Boolean} deactivateGfi if GFI is deactivated
 * @property {String} filename output filename
 * @property {String} mapfishServiceId the id from the rest services json for the mapfish app
 * @property {String} printAppId the identifier of one of the available mapfish print configurations
 * @property {Array} layoutList the identifier of one of the available mapfish print configurations
 * @property {Object} currentLayout the current layout
 * @property {String} currentLayoutName the current layout's name
 * @property {Array} formatList available formats of the specified print configuration
 * @property {Array} scaleList available scales of the specified print configuration
 * @property {String} currentScale current print scale
 * @property {String} title title for the report
 * @property {Boolean} isScaleSelectedManually is scale selected by the user over the view
 * @property {Boolean} isMetaDataAvailable true if the current layout supports meta data
 * @property {Boolean} isGfiAvailable true if the current layout supports gfi
 * @property {Boolean} isGfiSelected true if gfi is to be printed
 * @property {Boolean} isGfiActive true if gfi is active
 * @property {Boolean} isLegendAvailable true if the current layout supports legend
 * @property {Boolean} isLegendSelected true if the legend is to be printed
 * @property {Boolean} isScaleAvailable true if the current layout supports scale
 * @property {Boolean} isMapAvailable true if the Map is available
 * @property {Object} mapAttribute Attributes from the Map set from the layout
 * @property {Array} layoutMapInfo width and height of the map
 * @property {Array} optimalScale the optimal scale for the print
 * @property {Event} eventListener the event listener for postrender
 * @property {Array} layoutNameList the layouts
 * @property {Integer} currentMapScale the current map Scale
 * @property {Sring} progressWidth the style String for the progress bar
 */
const state = {
    active: false,
    name: "common:menu.tools.print",
    id: "print",
    isVisibleInMenu: true,
    renderToWindow: false,
    resizableWindow: true,
    deactivateGFI: false,
    filename: "report",
    mapfishServiceId: "",
    printService: "mapfish",
    printAppId: "master",
    printAppCapabilities: "capabilities.json",
    layoutList: [],
    currentLayout: undefined,
    currentLayoutName: "A4 Hochformat",
    // available formats of the specified print configuration
    formatList: ["gif", "pdf", "png", "svg", "tif", "tiff"],
    currentFormat: "pdf",
    scaleList: [],
    currentScale: undefined,
    title: "PrintResult",
    isScaleSelectedManually: false,
    isMetadataAvailable: false,
    metadataAttribute: null,
    isGfiAvailable: false,
    gfiAttribute: null,
    isGfiSelected: false,
    isGfiActive: false,
    gfiForPrint: null,
    isLegendAvailable: false,
    legendAttribute: null,
    isLegendSelected: false,
    isScaleAvailable: false,
    scaleAttribute: null,
    isMapAvailable: false,
    mapAttribute: null,
    layoutMapInfo: [],
    optimalScale: null,
    DOTS_PER_INCH: 72,
    INCHES_PER_METER: 39.37,
    glyphicon: "glyphicon-print",
    eventListener: undefined,
    dpiForPdf: 200,
    layoutNameList: [],
    currentMapScale: "",
    optimalResolution: "",
    hintInfoScale: "",
    visibleLayer: [],
    invisibleLayer: [],
    visibleLayerList: [],
    zoomLevel: null,
    hintInfo: "",
    mapfishServiceUrl: "",
    printFileReady: false,
    printStarted: false,
    progressWidth: "width: 0%",
    fileDownloadUrl: "",
    fileDownloads: [],
    outputFilename: "Ausdruck",
    defaultOutputFilename: "Ausdruck",
    outputFormat: "pdf",
    plotserviceIndex: -1,
    capabilitiesFilter: {},
    defaultCapabilitiesFilter: {},
    /**
     * @deprecated in the next major-release!
     * useProxy
     */
    useProxy: false
};

export default state;
