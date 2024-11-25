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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomShapes = void 0;
var core_1 = require("@maxgraph/core");
var registerCustomShapes = function () {
    // @ts-ignore TODO fix CellRenderer. Calls to this function are also marked as 'ts-ignore' in CellRenderer
    core_1.CellRenderer.registerShape('customRectangle', CustomRectangleShape);
    // @ts-ignore
    core_1.CellRenderer.registerShape('customEllipse', CustomEllipseShape);
};
exports.registerCustomShapes = registerCustomShapes;
var CustomRectangleShape = /** @class */ (function (_super) {
    __extends(CustomRectangleShape, _super);
    function CustomRectangleShape(bounds, fill, stroke) {
        var _this = _super.call(this, bounds, fill, stroke, 3) || this;
        _this.isRounded = true; // force rounded shape
        return _this;
    }
    CustomRectangleShape.prototype.paintBackground = function (c, x, y, w, h) {
        c.setFillColor('Chartreuse');
        _super.prototype.paintBackground.call(this, c, x, y, w, h);
    };
    CustomRectangleShape.prototype.paintVertexShape = function (c, x, y, w, h) {
        c.setStrokeColor('Black');
        _super.prototype.paintVertexShape.call(this, c, x, y, w, h);
    };
    return CustomRectangleShape;
}(core_1.RectangleShape));
var CustomEllipseShape = /** @class */ (function (_super) {
    __extends(CustomEllipseShape, _super);
    function CustomEllipseShape(bounds, fill, stroke) {
        return _super.call(this, bounds, fill, stroke, 5) || this;
    }
    CustomEllipseShape.prototype.paintVertexShape = function (c, x, y, w, h) {
        c.setFillColor('Yellow');
        c.setStrokeColor('Red');
        _super.prototype.paintVertexShape.call(this, c, x, y, w, h);
    };
    return CustomEllipseShape;
}(core_1.EllipseShape));
