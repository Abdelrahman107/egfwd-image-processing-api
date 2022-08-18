"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', index_1.default);
app.get('/', (req, res) => {
    res.send('<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> </article>');
});
app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
exports.default = app;
