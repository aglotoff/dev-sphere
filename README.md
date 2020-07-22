# DevSphere

[![Build Status](https://travis-ci.org/aglotoff/dev-sphere.svg?branch=develop)](https://travis-ci.org/aglotoff/dev-sphere)

Toy social network application for software developers built with the MERN stack.

**The application is under active development and most of its functionality is yet to be implemented!**

To see what has been already done, visit https://dev-sphere.herokuapp.com/

## Features

* Written in TypeScript
* Backend built with Node, Express, and MongoDB
* Frontend built with React and Redux
* Social login with Google and Facebook
* RESTful API
* Server Side Rendering (SSR)

## Quick Start

```bash
# Install dependencies
npm install

# Start the application in development mode
npm run dev

# Navigate to http://localhost:3000
```

In development mode, two server processes are started:
* The "real" backend server on http://localhost:4000
* A separate dev server on http://localhost:3000

The dev server improves developer experience by providind client-side hot
reloading. All api or static content requests are proxied to the "real" server,
so there is no need to access the backend directly.

## App Info

### Author

[Andrey Glotov](https://github.com/aglotoff)

### Version

1.0.0

### License

This project is licensed under the MIT License

## Resources

The design of the application is largely inspired by the [Goeveni PSD Template](https://themeforest.net/item/goeveni-event-sharing-social-network-psd-template/22577911).

People photos are generated using this service: https://generated.photos/
