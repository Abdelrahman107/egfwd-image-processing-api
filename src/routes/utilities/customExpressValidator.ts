import { check, ValidationChain } from 'express-validator';
import path from 'path';
import fs from 'fs';

const parentDirectory = __dirname + `../../../../`;
const imagesDirectory = path.join(parentDirectory, 'images');

const customQueryValidator: ValidationChain[] = [
  check('filename')
    .isString()
    .isLength({ min: 1 })
    .custom((value) => {
      if (!fs.existsSync(path.join(imagesDirectory, `${value}.jpg`))) {
        throw new Error('File does not exist or query parameter is missing ');
      }
      return true;
    })
    .withMessage('File does not exist or query parameter is missing'),
  // regex for width and height to be a number and greater than 0
  check('width').isLength({ min: 1 }).withMessage('width must be entered in query paramters').bail().isNumeric().withMessage('width must be a number').bail().isInt({ gt: 0 }).withMessage('width must be intergar and greater than 0'),
  check('height').isLength({ min: 1 }).withMessage('height must be entered in query paramters').bail().isNumeric().withMessage('height must be a number').bail().isInt({ gt: 0 }).withMessage('height must integer and greater than 0'),
];

export default customQueryValidator;
