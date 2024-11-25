"use strict";
/*
Copyright 2022-present The maxGraph project Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@maxgraph/core/css/common.css"); // required by RubberBandHandler
require("./style.css");
var core_1 = require("@maxgraph/core");
var custom_shapes_1 = require("./custom-shapes");
var initializeGraph = function (container) {
    // Disables the built-in context menu
    core_1.InternalEvent.disableContextMenu(container);
    var graph = new core_1.Graph(container, undefined, __spreadArray(__spreadArray([], (0, core_1.getDefaultPlugins)(), true), [
        core_1.RubberBandHandler, // Enables rubber band selection
    ], false));
    graph.setPanning(true); // Use mouse right button for panning
    // shapes and styles
    (0, custom_shapes_1.registerCustomShapes)();
    // create a dedicated style for "ellipse" to share properties
    graph.getStylesheet().putCellStyle('myEllipse', {
        perimeter: core_1.Perimeter.EllipsePerimeter,
        shape: 'ellipse',
        verticalAlign: 'top',
        verticalLabelPosition: 'bottom',
    });
    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();
    // Adds cells to the model in a single step
    graph.batchUpdate(function () {
        // use the legacy insertVertex method
        var vertex01 = graph.insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
        var vertex02 = graph.insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, {
            baseStyleNames: ['myEllipse'],
            fillColor: 'orange',
        });
        // use the legacy insertEdge method
        graph.insertEdge(parent, null, 'an orthogonal style edge', vertex01, vertex02, {
            edgeStyle: core_1.constants.EDGESTYLE.ORTHOGONAL,
            rounded: true,
        });
        // insert vertex using custom shapes using the new insertVertex method
        var vertex11 = graph.insertVertex({
            parent: parent,
            value: 'a custom rectangle',
            position: [20, 200],
            size: [100, 100],
            style: { shape: 'customRectangle' },
        });
        // use the new insertVertex method using position and size parameters
        var vertex12 = graph.insertVertex({
            parent: parent,
            value: 'a custom ellipse',
            x: 150,
            y: 350,
            width: 70,
            height: 70,
            style: {
                baseStyleNames: ['myEllipse'],
                shape: 'customEllipse',
            },
        });
        // use the new insertEdge method
        graph.insertEdge({
            parent: parent,
            value: 'another edge',
            source: vertex11,
            target: vertex12,
            style: { endArrow: 'block' },
        });
    });
};
// display the maxGraph version in the footer
var footer = document.querySelector('footer');
footer.innerText = "Built with maxGraph ".concat(core_1.Client.VERSION);
// Creates the graph inside the given container
initializeGraph(document.querySelector('#graph-container'));
