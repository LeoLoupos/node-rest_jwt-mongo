# NodeJS Rest API with Express , MongoDB , JWT and multer

A template for NodeJS Rest API with Express , MongoDB , JWT and multer.

- The packages I use: 
  - joi for data validation
  - bcrypt for password hashing
  - mongoose for MongoDB client
  - morgan for logging
  - body-parser
  - file and image uploading with multer
  - JsonWebToken for signed tokens
 
- The server has a custom CORS solution.

- The data model entities: User, Product, Order.
- I use uid reference to join the data structures and relate them. 


## Getting Started

 - git clone
 - Download Zip and unzip
 
### Prerequisites

What do you need installed ? 
  - Node 
  - MongoDB or Atlas
  - npm 

Google how to pass your process.env data , in your nodeJS server

### Installing

 - Start your mongoDB by running: mongod.
```
> mongod
```

 - Then npm install within the project dir.

```
> npm install
```

 - Last, run the server , with npm start.

```
> npm start
```

## Next Patch (v1):

   - passport.js with jwt strategy
   - :white_check_mark: data validation with [Joi](https://www.npmjs.com/package/joi)
   - :white_check_mark: [Redis](https://www.npmjs.com/package/redis) middleware caching 
   - :white_check_mark: Security Issues as : CSRF - Http Headers with Helmet
   - XSS & Content-Security-Policy - Setting Up with [helmet-csp](https://www.npmjs.com/package/helmet-csp)
   - :white_check_mark: Brute force Protection with [ratelimit.js](https://www.npmjs.com/package/ratelimit.js)
   - Errors with [Winston](https://www.npmjs.com/package/winston)
   - End to End tests , Unit testing , assertion test : [Mocha](https://www.npmjs.com/package/mocha) , [Chai](https://www.npmjs.com/package/chai) and Simon
  
## Authors

* **Leonidas Loupos** - *FullStack JS Developer* - [LinkedIn](https://www.linkedin.com/in/leo-loupos/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

