"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var typeorm_1 = require("typeorm");
var Event_1 = require("../entity/Event");
var eventRouter = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'green_net2023@mail.ru',
        pass: 'EduNuDVQvLCJrsEpxjHG'
    },
    tls: {
        rejectUnauthorized: false
    }
}, {
    from: 'Green-Net <green_net2023@mail.ru>',
});
var eventRepository;
// logic to return all events
eventRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var events;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.find()];
                case 1:
                    events = _a.sent();
                    return [2 /*return*/, res.json(events)];
            }
        });
    });
});
// logic to return event by id
eventRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to create and save an event
eventRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.create(req.body)];
                case 1:
                    event = _a.sent();
                    return [4 /*yield*/, eventRepository.save(event)
                            .then(function (res) {
                            var base64Data = req.body.QRurl.replace(/^data:image\/png;base64,/, '');
                            var imageBuffer = Buffer.from(base64Data, 'base64');
                            var startDate = new Date(req.body.dateOfStart);
                            var finishDate = new Date(req.body.dateOfFinish);
                            var mailOptions = {
                                from: 'green_net2023@mail.ru',
                                to: 'alexandra.volo18@gmail.com',
                                subject: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043C\u0435\u0440\u043E\u043F\u0440\u044F\u0442\u0438\u0438 ".concat(req.body.name),
                                html: "<h1>\u0412\u044B \u044F\u0432\u043B\u044F\u0435\u0442\u0435\u0441\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440\u043E\u043C \u043C\u0435\u0440\u043E\u043F\u0440\u044F\u0442\u0438\u044F ".concat(req.body.name, "</h1>\n                        <p><b>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: </b>").concat(req.body.description, "</p>\n                        <p><b>\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430: </b>").concat(startDate.getDate(), ".").concat(startDate.getMonth() + 1, ".").concat(startDate.getFullYear(), "</p>\n                        <p><b>\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F: </b>").concat(finishDate.getDate(), ".").concat(finishDate.getMonth() + 1, ".").concat(finishDate.getFullYear(), "</p>\n                        <p><b>\u041C\u0435\u0441\u0442\u043E: </b>").concat(req.body.place, "</p>\n                        <p><b>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B: </b>").concat(req.body.contacts, "</p>\n                        "),
                                attachments: [
                                    {
                                        filename: 'image.png',
                                        content: imageBuffer,
                                        contentType: 'image/png'
                                    }
                                ]
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        })];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to subscribe
eventRouter.post("/subscribe", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.findOneBy({
                        id: req.body.id
                    })];
                case 1:
                    event = _a.sent();
                    event.membersArr.push(JSON.stringify({ id: req.body.currentUserId, isMarked: false }));
                    return [4 /*yield*/, eventRepository.save(event)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    });
});
// logic to unsubscribe
eventRouter.post("/unsubscribe", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.findOneBy({
                        id: req.body.id
                    })];
                case 1:
                    event = _a.sent();
                    event.membersArr = event.membersArr.filter(function (item) {
                        var itemTmp = JSON.parse(item);
                        return itemTmp.id != req.body.currentUserId;
                    });
                    return [4 /*yield*/, eventRepository.save(event)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    });
});
//logic to mark user
eventRouter.post("/mark", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var event, updateItem, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.findOneBy({
                        id: req.body.id
                    })];
                case 1:
                    event = _a.sent();
                    updateItem = event.membersArr.forEach(function (item, index) {
                        var itemObj = JSON.parse(item);
                        if (itemObj.id === req.body.userId) {
                            itemObj.isMarked = !itemObj.isMarked;
                            event.membersArr[index] = JSON.stringify(itemObj);
                        }
                    });
                    eventRepository.merge(event, updateItem);
                    return [4 /*yield*/, eventRepository.save(event)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    });
});
//delete event
eventRouter.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eventRepository.delete(req.params.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
exports.default = (function () {
    eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
    return eventRouter;
});
