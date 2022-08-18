"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const express_validator_1 = require("express-validator");
const customExpressValidator_1 = __importDefault(require("../utilities/customExpressValidator"));
//import CustomqueryValidator from '../utilities/customExpressValidator';
const imageResizer = express_1.default.Router();
const parentDirectory = __dirname + `../../../../`;
const imagesDirectory = path_1.default.join(parentDirectory, 'images');
const resizedImagesDirectory = path_1.default.join(__dirname + `../../../../`, 'resizedImage');
imageResizer.get('/', customExpressValidator_1.default, (req, res) => {
    if (!fs_1.default.existsSync(resizedImagesDirectory)) {
        fs_1.default.mkdirSync(resizedImagesDirectory);
    }
    const filename = req.query.filename;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageSource = path_1.default.join(imagesDirectory, `${filename}.jpg`);
    const imageDestination = path_1.default.join(resizedImagesDirectory, `${filename}_${width}_${height}.jpg`);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => {
            if (error.msg != 'Invalid value') {
                return error.msg;
            }
        });
        // send with html  contains error messages
        // add to error message
        errorMessages.push('correct format: http://localhost:3000/api/images?filename=fjord&width=500&height=400');
        res.status(400).send(`<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> <p>${errorMessages.join('<br>')}</p> </article>`);
    }
    else {
        if (fs_1.default.existsSync(imageDestination) && fs_1.default.existsSync(imageSource)) {
            res.sendFile(imageDestination);
            // image has been cached out
        }
        else {
            (0, sharp_1.default)(imageSource)
                .resize(width, height)
                .toFile(imageDestination)
                .then(() => {
                res.sendFile(imageDestination);
            })
                .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error during image processing');
            });
        }
    }
});
exports.default = imageResizer;
