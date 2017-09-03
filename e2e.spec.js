"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict'; // necessary for es6 output in node
require("jasmine");
var protractor_1 = require("protractor");
describe('QuickStart E2E Tests', function () {
    var expectedMsg = 'Hello from Angular App with Webpack';
    beforeEach(function () {
        protractor_1.browser.get('');
    });
    it("should display: " + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual(expectedMsg);
    });
    it('should display an image', function () {
        expect(protractor_1.element(protractor_1.by.css('img')).isPresent()).toBeTruthy();
    });
});
//# sourceMappingURL=e2e.spec.js.map