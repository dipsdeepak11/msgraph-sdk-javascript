"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Client_1 = require("../../src/Client");
var CustomHTTPHandler_1 = require("../CustomHTTPHandler");
var DummyAuthenticationProvider_1 = require("../DummyAuthenticationProvider");
var PolyFill = require("../../src/PolyFill");
describe("Client.ts", function () {
    describe("initWithMiddleware", function () {
        /**
         * PolyFill fetch and promise before initializing client, otherwise error will be thrown
         */
        before(function () {
            PolyFill.init();
        });
        var dummyAuthProvider = new DummyAuthenticationProvider_1.DummyAuthenticationProvider(), customHTTPHandler = new CustomHTTPHandler_1.CustomHTTPHandler();
        it("Should throw an error in case if both auth provider and custom middleware is passed", function () {
            try {
                var options = {
                    authProvider: dummyAuthProvider,
                    middleware: customHTTPHandler
                };
                var client = Client_1.Client.initWithMiddleware(options);
                throw new Error("Something wrong with the ambiguity check");
            }
            catch (error) {
                chai_1.assert.equal(error.name, "AmbiguityInInitialization");
            }
        });
        it("Should return client instance for an authentication provider", function () {
            var options = {
                authProvider: dummyAuthProvider
            };
            var client = Client_1.Client.initWithMiddleware(options);
            chai_1.assert.isTrue(client instanceof Client_1.Client);
            chai_1.assert.isDefined(client["httpClient"]);
        });
        it("Should return client instance for a custom middleware chain", function () {
            var options = {
                middleware: customHTTPHandler
            };
            var client = Client_1.Client.initWithMiddleware(options);
            chai_1.assert.isTrue(client instanceof Client_1.Client);
            chai_1.assert.isDefined(client["httpClient"]);
        });
        it("Should throw error in case of neither auth provider nor custom middleware is passed", function () {
            try {
                var options = {};
                Client_1.Client.initWithMiddleware(options);
                throw new Error("Something wrong with the client initialization check");
            }
            catch (error) {
                chai_1.assert.equal(error.name, "InvalidMiddlewareChain");
            }
        });
    });
    describe("init", function () {
        it("Should return a client instance with default authentication provider and default middleware chain", function () {
            var provider = function (done) {
                done(null, "dummy_token");
            };
            var options = {
                authProvider: provider
            };
            var client = Client_1.Client.init(options);
            chai_1.assert.isDefined(client["httpClient"]);
        });
    });
});
//# sourceMappingURL=Client.js.map