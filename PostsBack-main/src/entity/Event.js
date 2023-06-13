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
exports.Event = void 0;
var User_1 = require("./User");
var typeorm_1 = require("typeorm");
var shortid = require('shortid');
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.prototype.setId = function () {
        this.id = shortid.generate();
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar", {
            length: 20
        }),
        __metadata("design:type", String)
    ], Event.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Event.prototype, "setId", null);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Event.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "dateOfStart", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "dateOfFinish", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "place", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "contacts", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Event.prototype, "reward", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'jsonb',
            nullable: true
        }),
        __metadata("design:type", Array)
    ], Event.prototype, "membersArr", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Event.prototype, "adminID", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Boolean)
    ], Event.prototype, "archiveByAuthor", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'jsonb',
            nullable: true
        }),
        __metadata("design:type", Array)
    ], Event.prototype, "keyWords", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function (type) { return User_1.User; }, function (user) { return user.events; }),
        __metadata("design:type", Array)
    ], Event.prototype, "users", void 0);
    Event = __decorate([
        (0, typeorm_1.Entity)()
    ], Event);
    return Event;
}());
exports.Event = Event;
