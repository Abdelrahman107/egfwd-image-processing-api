"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageResizer_1 = __importDefault(require("./api/imageResizer"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images, correct format: http://localhost:3000/api/images?filename=fjord&width=500&height=400</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> </article>');
});
routes.use('/images', imageResizer_1.default);
exports.default = routes;
