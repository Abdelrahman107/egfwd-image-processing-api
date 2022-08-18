
# egfwd-image-processing-api
# Description
Create an  image processing API that resizes and saves images to user specifications when visiting a URL, and caches out data if it already exists.
this project is submitted for Advanced Full-Stack Web Development Nanodegree by udacity.





## The scripts needed to test/start/build the application

Install required packages
```bash
npm install
```

to build the application and compile TS to JS 
```bash
npm run build
 ```

 to start the server in production/build
 ```bash
npm run start
 ```
 to start the server in dev
 ```bash
npm run start-dev
 ```
to run tests    
  ```bash
npm run test
 ```

to run lint and prettier    
  ```bash
npm run lint
npm run prettier
 ```



      

      

# Endpoints
localhost
```bash
http://localhost:3000/
 ```

/api/images
```bash
http://localhost:3000/api/images?filename=name&width=number&height=number

For example,
http://localhost:3000/api/images?filename=fjord&width=500&height=400
 ```


*the endpoint takes 3 query parameters*
* filename=name, where *name must be a string of length > 0*
* width=number,  *where width  must be postive integer greater than 0*
* height=number, *where height must be postive integer greater than 0*



# Usage

 1. image must be in images folder to be resized
 
 2. to resize fjord.jpg image placed in images folder with width=500 and height=400, example below
```bash
http://localhost:3000/api/images?filename=fjord&width=500&height=400
 ```
 
 3. the resized images will be placed in resizedImages folder with file name
 ```bash
filename_width_height.jpg
fjord_500_400.jpg
 ```

 4. if the image already exists in resizedImage, it will be cached out without reprocessing.


 # Validation and Error Handling

I used express-validator to validate query parameters and make sure that
* filename exists in images folder, if not return a 400 status code with error message.
* width and height are positive integers  and greater than 0, if not return a 400 status code with error message.


## Packages and Dependencies
* express and express-validator
* fs and path
* jasmine and supertest
* prettier and lint
* typescript
