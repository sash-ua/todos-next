"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
var ErrorHandlerService = (function () {
    function ErrorHandlerService() {
    }
    ErrorHandlerService.prototype.handleError = function (error) {
        console.log(error); // log to console instead
        return Observable_1.Observable.throw(error);
    };
    ErrorHandlerService.prototype.displayErrors = function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            return ('The password is wrong.');
        }
        else if (errorCode === 'auth/invalid-email') {
            return ('Enter valid email!');
        }
        else if (errorCode === 'auth/weak-password') {
            return ('The password is too weak.');
        }
        else if (errorCode === 'auth/invalid-email') {
            return ('Enter valid email!');
        }
        else {
            return (errorMessage);
        }
    };
    ErrorHandlerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
