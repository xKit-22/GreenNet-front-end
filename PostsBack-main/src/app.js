"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var postMethods_1 = require("./entityesMethods/postMethods");
var eventsMethods_1 = require("./entityesMethods/eventsMethods");
var commentMethods_1 = require("./entityesMethods/commentMethods");
var userMethods_1 = require("./entityesMethods/userMethods");
var auth_1 = require("./authorization/auth");
var shopMethods_1 = require("./entityesMethods/shopMethods");
var markerMethods_1 = require("./entityesMethods/markerMethods");
require("dotenv").config();
var cors = require('cors');
(0, typeorm_1.createConnection)().then(function (connection) {
    // create and setup express app
    var app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/posts", (0, postMethods_1.default)());
    app.use("/comments", (0, commentMethods_1.default)());
    app.use("/users", (0, userMethods_1.default)());
    app.use("/events", (0, eventsMethods_1.default)());
    app.use("/shop", (0, shopMethods_1.default)());
    app.use("/api/auth", (0, auth_1.default)());
    app.use("/marker", (0, markerMethods_1.default)());
    app.listen(3000, function () { return console.log("start"); });
});
