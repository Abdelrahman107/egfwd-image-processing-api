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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../../../index"));
const sharp_1 = __importDefault(require("sharp"));
const request = (0, supertest_1.default)(index_1.default);
const resizedDirectory = path_1.default.join(__dirname, '../../../../resizedImage');
describe('GET /api/images?filename=fjord&width=700&height=700', () => {
    it('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    it('should save the resized image in resizedImage folder with name fjord_700_700.jpg', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?filename=fjord&width=700&height=700');
        const filename = 'fjord';
        const width = 700;
        const height = 700;
        const imageDestination = path_1.default.join(resizedDirectory, `${filename}_${width}_${height}.jpg`);
        expect(fs_1.default.existsSync(imageDestination)).toBe(true);
    }));
});
describe('GET /api/images?filename=abc&width=700&height=700', () => {
    it('should return 400 since abc is not an image in images folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=notimage&width=700&height=700');
        expect(response.status).toBe(400);
    }));
});
describe('GET /api/images?filename=fjord&width=abc&height=700', () => {
    it('should return 400 since width must be a number not abc', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=abc&height=700');
        expect(response.status).toBe(400);
    }));
});
describe('GET /api/images?filename=encenadaport&width=700&height=0', () => {
    it('should return 400 since height must be greater than 0', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=700&height=0');
        expect(response.status).toBe(400);
    }));
});
describe('GET /api/images?width=700&height=700', () => {
    it('should return 400 since filename is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?width=700&height=700');
        expect(response.status).toBe(400);
    }));
});
// test that resizing works
describe('testing Sharp Package to resize an fjord.jpg image with resize(500,400)', () => {
    it('should return true after image is resized sucessfully with width=500 ', () => __awaiter(void 0, void 0, void 0, function* () {
        const meta = yield (0, sharp_1.default)(path_1.default.join(__dirname, '../../../../images/fjord.jpg'))
            .resize(500, 400)
            .toBuffer()
            .then((data) => {
            return (0, sharp_1.default)(data).metadata();
        });
        expect(meta.width).toBe(500);
    }));
    it('should return true after image is resized sucessfully with height=400', () => __awaiter(void 0, void 0, void 0, function* () {
        const meta = yield (0, sharp_1.default)(path_1.default.join(__dirname, '../../../../images/fjord.jpg'))
            .resize(500, 400)
            .toBuffer()
            .then((data) => {
            return (0, sharp_1.default)(data).metadata();
        });
        expect(meta.height).toBe(400);
    }));
});
