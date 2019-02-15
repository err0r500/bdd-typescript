"use strict";
exports.__esModule = true;
var BookingAttempt = /** @class */ (function () {
    function BookingAttempt(vtcFirstname, origin, destination) {
        this.vtcFirstname = vtcFirstname;
        this.origin = origin;
        this.destination = destination;
    }
    BookingAttempt.prototype.handle = function () {
        return "ok";
    };
    return BookingAttempt;
}());
exports.BookingAttempt = BookingAttempt;
