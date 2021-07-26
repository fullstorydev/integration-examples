# FullStory Integration Samples

This project contains a collection of code samples, integrations, and best practices provided by FullStory. Examples are written in JavaScript and support [browser compatibility consistent with FullStory recording](https://help.fullstory.com/hc/en-us/articles/360020624594-What-browsers-are-currently-supported-by-FullStory-).

## Using Samples

Compiled samples can be found in the `dist` folder. Each sample is packaged as an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), which can deployed through a tag manager or simply re-used within your project.

## Building Samples

If you'd like to modify a sample or build your own, follow these steps:

1. Install [Node.js](https://nodejs.org) as needed.
2. Change directory to this project's root folder.
3. Run `npm install`.
4. Code your integration as a new JavaScript file in the `src` folder.
5. Run `npm run build`.

The `dist` folder will contain a compiled file that has the same name as the one in your `src` folder.
