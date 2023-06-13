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
exports.Shop = void 0;
var typeorm_1 = require("typeorm");
var shortid = require('shortid');
var Shop = /** @class */ (function () {
    function Shop() {
    }
    Shop.prototype.setId = function () {
        this.id = shortid.generate();
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar", {
            length: 20
        }),
        __metadata("design:type", String)
    ], Shop.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Shop.prototype, "setId", null);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Shop.prototype, "img", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Shop.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Shop.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Shop.prototype, "cost", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Shop.prototype, "validityDate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Shop.prototype, "isUsed", void 0);
    Shop = __decorate([
        (0, typeorm_1.Entity)()
    ], Shop);
    return Shop;
}());
exports.Shop = Shop;
