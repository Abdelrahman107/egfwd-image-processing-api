import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ValidationError, validationResult } from 'express-validator';
import customQueryValidator from '../utilities/customExpressValidator';
//import CustomqueryValidator from '../utilities/customExpressValidator';

const imageResizer = express.Router();
const parentDirectory = __dirname + `../../../../`;
const imagesDirectory = path.join(parentDirectory, 'images');
const resizedImagesDirectory = path.join(__dirname + `../../../../`, 'resizedImage');

imageResizer.get('/', customQueryValidator, (req: express.Request, res: express.Response): void => {
  if (!fs.existsSync(resizedImagesDirectory)) {
    fs.mkdirSync(resizedImagesDirectory);
  }

  const filename: string = req.query.filename as string;
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const imageSource: string = path.join(imagesDirectory, `${filename}.jpg`);
  const imageDestination: string = path.join(resizedImagesDirectory, `${filename}_${width}_${height}.jpg`);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages: string[] = errors.array().map((error: ValidationError) => {
      if (error.msg != 'Invalid value') {
        return error.msg;
      }
    });
    // send with html  contains error messages
    // add to error message
    errorMessages.push('correct format: http://localhost:3000/api/images?filename=fjord&width=500&height=400');
    res.status(400).send(`<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> <p>${errorMessages.join('<br>')}</p> </article>`);
  } else {
    if (fs.existsSync(imageDestination) && fs.existsSync(imageSource)) {
      res.sendFile(imageDestination);
      // image has been cached out
    } else {
      sharp(imageSource)
        .resize(width, height)
        .toFile(imageDestination)
        .then(() => {
          res.sendFile(imageDestination);
        })
        .catch((err: Error) => {
          console.log(err);
          res.status(500).send('Internal Server Error during image processing');
        });
    }
  }
});
export default imageResizer;
