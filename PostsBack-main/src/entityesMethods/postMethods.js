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
var Post_1 = require("../entity/Post");
var authorVerification_1 = require("../authorization/authorVerification");
var Subscription_1 = require("../entity/Subscription");
var User_1 = require("../entity/User");
var postRouter = express.Router();
var postRepository;
var subscriptionRepository;
var userRepository;
//logic to return posts by subscriptions
postRouter.get("/feed", authorVerification_1.default, function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var subscriptions, subscriptionsId, posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(111);
                    return [4 /*yield*/, subscriptionRepository.findBy({
                            subscriberId: req.body.currentUserId
                        })];
                case 1:
                    subscriptions = _a.sent();
                    console.log(subscriptions, 111);
                    subscriptionsId = subscriptions.map((function (subscription) { return subscription.whoAreSubscribedToId; }));
                    console.log(subscriptionsId);
                    return [4 /*yield*/, postRepository.find({
                            where: { authorId: (0, typeorm_1.In)(subscriptionsId) },
                            order: { dateOfCreation: "DESC" },
                        })];
                case 2:
                    posts = _a.sent();
                    return [2 /*return*/, res.send(posts)];
            }
        });
    });
});
// logic to return all posts
postRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.find()];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, res.json(posts)];
            }
        });
    });
});
// logic to return post by id
postRouter.get("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to create and save a post
postRouter.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, results, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.create(req.body)];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, postRepository.save(post)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, userRepository.findOneBy({
                            id: req.body.authorId
                        })];
                case 3:
                    user = _a.sent();
                    user.postsAmount++;
                    // userRepository.merge(user, changePostsAmount)
                    return [4 /*yield*/, userRepository.save(user)];
                case 4:
                    // userRepository.merge(user, changePostsAmount)
                    _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to update a post by a given post id
postRouter.put("/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    post = _a.sent();
                    postRepository.merge(post, req.body);
                    return [4 /*yield*/, postRepository.save(post)];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to delete a post by a given post id
postRouter.delete("/deletePost/:id", /*authorVerification,*/ function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, user, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, userRepository.findOneBy({
                            id: post.authorId
                        })];
                case 2:
                    user = _a.sent();
                    user.postsAmount--;
                    return [4 /*yield*/, postRepository.delete(req.params.id)
                        // userRepository.merge(user, changePostsAmount)
                    ];
                case 3:
                    results = _a.sent();
                    // userRepository.merge(user, changePostsAmount)
                    return [4 /*yield*/, userRepository.save(user)];
                case 4:
                    // userRepository.merge(user, changePostsAmount)
                    _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// logic to return user`s posts by user id
postRouter.get("/author/:authorId", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findBy({
                        authorId: req.params.authorId
                    })];
                case 1:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// //logic to return amount of post's likes
// postRouter.get("/:id/likesAmount", async function(req: Request, res: Response) {
//     const amount = await postRepository.findOneBy({
//         id: req.params.id
//     }).likesAmount;
//     return res.send(amount)
// });
// +like
postRouter.post("/:id/like", /*authorVerification,*/ function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, currentUser, likedPost, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, userRepository.findOneBy({
                            id: req.body.currentUserId
                        })];
                case 2:
                    currentUser = _a.sent();
                    currentUser.likedPosts.push(post.id);
                    likedPost = post.likesAmount++;
                    postRepository.merge(post, likedPost);
                    return [4 /*yield*/, userRepository.save(currentUser)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.save(post)];
                case 4:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
// -like
postRouter.post("/:id/unlike", /*authorVerification,*/ function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, currentUser, likedPost, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postRepository.findOneBy({
                        id: req.params.id
                    })];
                case 1:
                    post = _a.sent();
                    return [4 /*yield*/, userRepository.findOneBy({
                            id: req.body.currentUserId
                        })];
                case 2:
                    currentUser = _a.sent();
                    currentUser.likedPosts = currentUser.likedPosts.filter(function (e) {
                        return e != post.id;
                    });
                    likedPost = post.likesAmount--;
                    postRepository.merge(post, likedPost);
                    return [4 /*yield*/, userRepository.save(currentUser)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, postRepository.save(post)];
                case 4:
                    results = _a.sent();
                    return [2 /*return*/, res.send(results)];
            }
        });
    });
});
exports.default = (function () {
    postRepository = (0, typeorm_1.getRepository)(Post_1.Post);
    userRepository = (0, typeorm_1.getRepository)(User_1.User),
        subscriptionRepository = (0, typeorm_1.getRepository)(Subscription_1.Subscription);
    return postRouter;
});
/*
fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":"text", "picture":"picture", "likesAmount":10, "authorId":12, "dateOfCreation":"12.03.22"})
}).then(res => res.json())
    .then(res => console.log(res));
*/
/*fetch('http://localhost:3000/posts/2', {
    method: 'PUT',
    headers: {
        'Accept': 'application/json, text/plain, *!/!*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"text":"textUPD", "picture":"pictureUPD", "likesAmount":12, "authorId":14, "dateOfCreation":"15.02.22"})
}).then(res => res.json())
    .then(res => console.log(res));*/
/*fetch('http://localhost:3000/posts/2', {
    method: 'DELETE'
}).then(res => res.json())
    .then(res => console.log(res))*/
