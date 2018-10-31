JavaScript Development Environment
==================================

## Project Description:
This is Talima's WIP JavaScript Development Environment. (Full MERN Stack)  
Next version will include React.js. Pull updates from Master branch. Enjoy! Good luck! Have fun!

## Chosen Tools/Features:
**Editor** - VSCode (with .editorconfig)  
**Database** - MongoDB  
**Development Server** - Express  
**Package Manager** - npm  
**Automation** - npm scripts  
**Transpiler** - Babel  
**Bundler** - Webpack *(not active)*  
**Linter** - ESLint  
**Testing** - Mocha (framework), Chai (assertion library), JSDOM (helper library)  
**Continuous Integration** - Travis CI, Appveyor  
**HTTP Calls** - Fetch (with polyfill), Axios  
**Minification** - Bundler (Webpack) *(not active)*  
**Bundle Splitting** - Bundler (Webpack) *(not active)*  
**Cache Busting** - Bundler (Webpack) *(not active)*  
**Error Logging** - Track:js recommended (not included, price gate)  

## NPM Scripts: (package.json)
**start** - Launch the application (entry point: 'build/srcServer.js')  
**test** - Run all application tests (stored in 'test' folder)  

## Desired Improvements:
-Add MongoDB installation setup info
-Create Header and Footer .ejs templates
-Add support for React.js
-Move Mongo client into seperate script (only one connection)
-Upon adding Goodreads' books to database, retrieve and store book image
-Linting occasionally outputs twice in console
-Add bundling (webpack) back into environment
-Add sourcemaps into environment
-Can we remove the IIFE from adminRoutes.js
-Research Fetch (polyfill required for Node.js) and Axios, choose one and remove other
-Research Parcel Bundler as a Webpack standin/replacement
-Add a 'Build' and/or 'Deploy' npm script
-Research localTunnel, test, rewrite share npm script
-Ensure test npm script runs all tests
-bookListView and bookView views 'more' buttons links to '/'

## JavaScript Project Structure Tips:
**1)** JS belongs in a .js file  
**2)** Consider organizing by feature (larger projects) vs. file type (MVC)  
**3)** Extract logic to POJOs (Plain Old JavaScript Object), your JS logic should exist outside of framework components  
