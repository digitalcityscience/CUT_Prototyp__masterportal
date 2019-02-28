/** -------------------- StyleWMS -------------------- */

/**
 * @event StyleWmsModel#RadioTriggerStyleWmsopenStyleWms
 * @param {Object} model Layer model to be styled
 * @description Opens the Tool and sets the layer model. Event is triggered by clicking on the glyphicon in the layer tree.
 * @example Radio.trigger("StyleWMS", "openStyleWMS", model)
 */

/**
 * @event StyleWMS#RadioTriggerStyleWmsResetParamsStyleWms
 * @param {Object} model Layer model to be styled
 * @description Resets the stylewms parasm for legend
 * @example Radio.trigger("StyleWMS", "resetParamsStyleWMS", model)
 */

/**
 * @event StyleWMS#RadioTriggerStyleWmsUpdateParamsStyleWms
 * @param {Object[]} attributes -
 * @description Sets the style wms params for legend so that the legend can be updated
 * @example Radio.trigger("StyleWMS", "updateParamsStyleWMS", attributes)
 */

/**
 * @event StyleWmsModel#changeModel
 * @description Triggered when layer model to style changes
 */

/**
 * @event StyleWmsModel#changeIsActive
 * @description Triggered when stylewms model gets activated
 */

/**
 * @event StyleWmsModel#changeAttributeName
 * @description Triggered when attributeName changes
 */

/**
 * @event StyleWmsModel#changeNumberOfClasses
 * @description Triggered when numberOfClasses changes
 */

/**
 * @event StyleWmsModel#changeSetSld
 * @description Triggered when setSLD changes
 */

/**
 * @event StyleWmsModel#sync
 * @description Triggered when setSLD changes
 */


/** -------------------- ALERTING -------------------- */

/**
 * @event AlertingModel#changePosition
 * @param {Backbone/Model} model The model whose attribute hat changed.
 * @param {Boolean} value The attribute value that has changed.
 * @description Triggered when Model attribute position has changed.
 */

/**
 * @event AlertingModel#render
 * @description Triggered when View has to render.
 * @example this.trigger("render")
 */

/**
 * @event AlertingModel#RadioTriggerAlertAlert
 * @param {String/Object} alert The alert object or string needed to create the alert.
 * @example Radio.trigger("Alert", "alert", alert)
 */

/**
 * @event AlertingView#RadioTriggerAlertAlertRemove
 * @example Radio.trigger("Alert", "alert:remove")
 */

/**
 * @event AlertingView#RadioTriggerAlertClosed
 * @param {String} id The id of the alert that has been closed.
 * @example Radio.trigger("Alert", "closed", id)
 */

/**
 * @event AlertingView#RadioTriggerAlertConfirmed
 * @param {String} id The id of the alert that has been confirmed.
 * @example Radio.trigger("Alert", "confirmed", id)
 */


/** -------------------- CLICK COUNTER -------------------- */

/**
 * @event ClickCounterView#RadioTriggerClickCounterToolChanged
 * @example Radio.trigger("ClickCounter", "toolChanged")
*/

/**
 * @event ClickCounterView#RadioTriggerClickCounterCalcRoute
 * @example Radio.trigger("ClickCounter", "calcRoute")
*/

/**
 * @event ClickCounterView#RadioTriggerClickCounterZoomChanged
 * @example Radio.trigger("ClickCounter", "zoomChanged")
*/

/**
 * @event ClickCounterView#RadioTriggerClickCounterLayerVisibleChanged
 * @example Radio.trigger("ClickCounter", "layerVisibleChanged")
*/

/**
 * @event ClickCounterView#RadioTriggerClickCounterGfi
 * @example Radio.trigger("ClickCounter", "gfi")
*/


/** -------------------- LAYER -------------------- */

/**
 * @event Layer#changeIsSelected
 * @param {Backbone.Model} model The model whose attribute hat changed.
 * @param {Boolean} value The attribute value that has changed.
 * @description Fired if attribute isSelected has changed
 */

/**
 * @event Layer#changeIsVisibleInMap
 * @param {Backbone.Model} model The model whose attribute hat changed.
 * @param {Boolean} value The attribute value that has changed.
 * @description Fired if attribute isVisibleInMap has changed
 */

/**
 * @event Layer#changeTransparency
 * @param {Backbone.Model} model The model whose attribute hat changed.
 * @param {Boolean} value The attribute value that has changed.
 * @description Fired if attribute transparency has changed
 */

/**
 * @event Layer#RadioTriggerLayerUpdateLayerInfo
 * @param {String} name The name of the layer.
 * @example Radio.trigger("Layer", "updateLayerInfo", name)
 */

/**
 * @event Layer#RadioTriggerLayerSetLayerInfoChecked
 * @param {Boolean} value Flag that signs that the layer informations has been checked.
 * @example Radio.trigger("Layer", "setLayerInfoChecked", value)
 */

/**
 * @event Layer#RadioTriggerLayerFeaturesLoaded
 * @param {String} id Id of vector layer.
 * @param {ol/Feature[]} features Features that have been loaded.
 * @example Radio.trigger("Layer", "featuresLoaded", id, features)
 */


/** -------------------- MAP -------------------- */

/**
 * @event Map#RadioTriggerMapChange
 * @param {String} mode Mode of the map.
 * @description Event that gets fired when the map mode ("2D" / "3D") has changed.
 * @example Radio.trigger("Map", "changed", mode)
 */

/**
 * @event Map#RadioTriggerMapAddLayerToIndex
 * @description Adds layer to given index
 * @param {Array} array Array consisting of the ol/layer and the given index. [layer, index]
 * @example Radio.trigger("Map", "addLayerToIndex", array)
 */


/** -------------------- MAP VIEW -------------------- */

/**
 * @event MapView#RadioTriggerMapViewChangedOptions
 * @param {Object} options Options of mapview status
 * @description Event that gets fired when the map view options have changed. The options are scale, center, zoomLevel
 * @example Radio.trigger("MapView", "changedOptions", options)
 */

/**
 * @event MapView#RadioRequestMapViewGetResoByScale
 * @param {String} scale Options of mapview status
 * @description Event that gets the resolution depending on the map scale
 * @example Radio.trigger("MapView", "getResoByScale", scale)
 */


/** -------------------- LAYER INFORMATION -------------------- */

/**
 * @event LayerInformation#RadioTriggerLayerInformationAdd
 * @param {Object} options Options of mapview status
 * @example Radio.trigger("LayerInformation", "add", options)
 */

/** -------------------- MODEL LIST -------------------- */

/**
 * @event List#RadioRequestModelListGetCollection
 * @description Returns itself
 * @example Radio.request("ModelList", "getCollection")
 */

/**
 * @event List#RadioRequestModelListGetModelsByAttributes
 * @param {Object} attributes Attributes used to find models to be returned
 * @description Returns the models that match the given attributes
 * @example Radio.request("ModelList", "getModelsByAttributes", attributes)
 */

/**
 * @event List#RadioRequestModelListGetModelByAttributes
 * @param {Object} attributes Attributes used to find model to be returned
 * @description Returns the first model that matches the given attributes. If model cannot be found, the function look for a group layer model containing the attributes
 * @example Radio.request("ModelList", "getModelByAttributes", attributes)
 */

/**
 * @event List#RadioTriggerModelListSetModelAttributesById
 * @description See {@link List#setModelAttributesById}
 * @example Radio.trigger("ModelList", "setModelAttributesById", id, attrs)
 */

/**
 * @event List#RadioTriggerModelListShowAllFeatures
 * @description See {@link List#showAllFeatures}
 * @example Radio.trigger("ModelList", "showAllFeatures", id)
 */

/**
 * @event List#RadioTriggerModelListHideAllFeatures
 * @description See {@link List#hideAllFeatures}
 * @example Radio.trigger("ModelList", "hideAllFeatures", id)
 */

/**
 * @event List#RadioTriggerModelListShowFeaturesById
 * @description See {@link List#showFeaturesById}
 * @example Radio.trigger("ModelList", "showFeaturesById", id, featureIds)
 */

/**
 * @event List#RadioTriggerModelListRemoveModelsByParentId
 * @description See {@link List#removeModelsByParentId}
 * @example Radio.trigger("ModelList", "removeModelsByParentId", parentId)
 */

/**
 * @event List#RadioTriggerModelListAddInitialyNeededModels
 * @description See {@link List#addInitialyNeededModels}
 * @example Radio.trigger("ModelList", "addInitialyNeededModels")
 */

/**
 * @event List#RadioTriggerModelListAddModelsByAttributes
 * @description See {@link List#addModelsByAttributes}
 * @example Radio.trigger("ModelList", "addModelsByAttributes", attrs)
 */

/**
 * @event List#RadioTriggerModelListSetIsSelectedOnChildLayers
 * @description See {@link List#setIsSelectedOnChildLayers}
 * @example Radio.trigger("ModelList", "setIsSelectedOnChildLayers", model)
 */

/**
 * @event List#RadioTriggerModelListSetIsSelectedOnParent
 * @description See {@link List#setIsSelectedOnParent}
 * @example Radio.trigger("ModelList", "setIsSelectedOnParent", model)
 */

/**
 * @event List#RadioTriggerModelListShowModelInTree
 * @description See {@link List#showModelInTree}
 * @example Radio.trigger("ModelList", "showModelInTree", modelId)
 */

/**
 * @event List#RadioTriggerModelListCloseAllExpandedFolder
 * @description See {@link List#closeAllExpandedFolder}
 * @example Radio.trigger("ModelList", "closeAllExpandedFolder")
 */

/**
 * @event List#RadioTriggerModelListSetAllDescendantsInvisible
 * @description See {@link List#setAllDescendantsInvisible}
 * @example Radio.trigger("ModelList", "setAllDescendantsInvisible", parentId, isMobile)
 */

/**
 * @event List#RadioTriggerModelListRenderTree
 * @fires List#RenderTree
 * @example Radio.trigger("ModelList", "renderTree")
 */

/**
 * @event List#RenderTree
 * @description Triggers "renderTree"
 * @example this.trigger("renderTree")
 */

/**
 * @event List#RadioTriggerModelListToggleWfsCluster
 * @description See {@link List#toggleWfsCluster}
 * @example Radio.trigger("ModelList", "toggleWfsCluster", value)
 */

/**
 * @event List#RadioTriggerModelListToggleDefaultTool
 * @description See {@link List#toggleDefaultTool}
 * @example Radio.trigger("ModelList", "toggleDefaultTool")
 */

/**
 * @event List#ChangeIsVisibleInMap
 * @description Triggered when one item has a change in the attribute isVisibleInMap
 * @fires List#RadioTriggerModelListUpdateVisibleInMapList
 * @fires List#RadioTriggerModelListUpdatedSelectedLayerList
 */

/**
 * @event List#ChangeIsExpanded
 * @description Triggered when one item has a change in the attribute isExpaned
 * @fires List#UpdateOverlayerView
 * @fires List#UpdateSelection
 * @fires List#TraverseTree
 * @fires List#RadioTriggerModelListUpdatedSelectedLayerList
 */

/**
 * @event List#ChangeIsSelected
 * @description Triggered when one item has a change in the attribute IsSelected
 * @fires List#UpdateSelection
 * @fires List#RadioTriggerModelListUpdatedSelectedLayerList
 */

/**
 * @event List#ChangeTransparency
 * @description Triggered when one item has a change in the attribute transparency
 * @fires List#RadioTriggerModelListUpdatedSelectedLayerList
 */

/**
 * @event List#ChangeSelectionIDX
 * @description Triggered when one item has a change in the attribute selectionIDX
 * @fires List#RadioTriggerModelListUpdatedSelectedLayerList
 */

/**
 * @event List#UpdateSelection
 * @description Triggered when selection was updated
 * @example this.trigger("updateSelection", model)
 */

/**
 * @event List#UpdateLightTree
 * @description Triggered when light tree was updated
 * @example this.trigger("updateLightTree")
 */

/**
 * @event List#ChangeSelectedList
 * @description Triggered when selected list has changed
 */

/**
 * @event List#TraverseTree
 * @description Used for mobile
 * @example this.trigger("traverseTree")
 */

/**
 * @event List#RadioTriggerModelListUpdateVisibleInMapList
 * @example Radio.trigger("ModelList", "updateVisibleInMapList")
 */

/**
 * @event List#RadioTriggerModelListUpdatedSelectedLayerList
 * @example Radio.trigger("ModelList", "updatedSelectedLayerList")
 */

/**
 * @event List#UpdateOverlayerView
 * @example this.trigger("updateOverlayerView", id)
 */
