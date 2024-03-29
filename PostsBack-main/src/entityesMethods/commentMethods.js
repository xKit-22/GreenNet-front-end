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
        while (_) try {
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
var Comment_1 = require("../entity/Comment");
var authorVerification_1 = require("../authorization/authorVerification");
var commentRouter = express.Router();
var commentRepository;
//logic to return all comments
commentRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var comments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.find()];
                case 1:
                    comments = _a.sent();
                    return [2 /*return*/, res.json(comments)];
            }
        });
    });
});
//logic to return comment by id
commentRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
//logic to create and save a comment
commentRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var comment, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.create(req.body)];
                case 1:
                    comment = _a.sent();
                    return [4 /*yield*/, commentRepository.save(comment)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to update a comment by a given comment id
commentRouter.put("/:id", authorVerification_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var comment, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    comment = _a.sent();
                    commentRepository.merge(comment, req.body);
                    return [4 /*yield*/, commentRepository.save(comment)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
//logic to delete a comment by a given comment id
commentRouter.delete("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.delete(req.params.id)];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
//logic to return user`s comments by user id
commentRouter.get("/author/:authorId", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findBy({
                        authorId: req.params.authorId
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
//logic to return comments by post id
commentRouter.get("/post/:postId", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findBy({
                        postId: req.params.postId
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// +like
commentRouter.get("/:id/like", authorVerification_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var comment, likedComment, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    comment = _a.sent();
                    likedComment = comment.likesAmount++;
                    commentRepository.merge(comment, likedComment);
                    return [4 /*yield*/, commentRepository.save(comment)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// -like
commentRouter.get("/:id/unlike", authorVerification_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var comment, likedComment, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commentRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    comment = _a.sent();
                    likedComment = comment.likesAmount--;
                    commentRepository.merge(comment, likedComment);
                    return [4 /*yield*/, commentRepository.save(comment)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
exports.default = (function () {
    commentRepository = (0, typeorm_1.getRepository)(Comment_1.Comment);
    return commentRouter;
});
/*fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"postId": 5, "text":"commentText1", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res));*/
/*fetch('http://localhost:3000/comments/2', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"postId": 5,  "text":"commentText2UPD", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res))*/
/*fetch('http://localhost:3000/comments/3', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/
