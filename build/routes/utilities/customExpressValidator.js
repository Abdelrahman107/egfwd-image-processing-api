"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parentDirectory = __dirname + `../../../../`;
const imagesDirectory = path_1.default.join(parentDirectory, 'images');
const customQueryValidator = [
    (0, express_validator_1.check)('filename')
        .isString()
        .isLength({ min: 1 })
        .custom((value) => {
        if (!fs_1.default.existsSync(path_1.default.join(imagesDirectory, `${value}.jpg`))) {
            throw new Error('File does not exist or query parameter is missing ');
        }
        return true;
    })
        .withMessage('File does not exist or query parameter is missing'),
    // regex for width and height to be a number and greater than 0
    (0, express_validator_1.check)('width').isLength({ min: 1 }).withMessage('width must be entered in query paramters').bail().isNumeric().withMessage('width must be a number').bail().isInt({ gt: 0 }).withMessage('width must be greater than 0'),
    (0, express_validator_1.check)('height').isLength({ min: 1 }).withMessage('height must be entered in query paramters').bail().isNumeric().withMessage('height must be a number').bail().isInt({ gt: 0 }).withMessage('height must be greater than 0'),
];
exports.default = customQueryValidator;
