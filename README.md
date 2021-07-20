# FullStory Integration Samples

This project contains a collection of code samples, integrations, and best practices provided by FullStory. Examples are written in JavaScript and support [browser compatibility consistent with FullStory recording](https://help.fullstory.com/hc/en-us/articles/360020624594-What-browsers-are-currently-supported-by-FullStory-).

## Using Samples

Samples can be referenced directly from their respective JavaScript files. The `utils` folder contains utility functions that can be used with any integration project or are specific to a vendor. More feature rich use cases exist in the `src` folder in their respective vendor directories. These use cases have a modular design to support testing and composition. To create a sample that can be deployed to your website, see the Building Samples section.

## Building Samples

To deploy a sample to you website, clone this repo and then do the following:

1. Install [Node.js](https://nodejs.org) as needed.
2. Change directory to this project's root folder.
3. Run `npm install`.
4. Run `npm run build`.
5. Refer to the files contained in the `dist` folder.

Each sample will be an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). You can deploy the IIFE through a tag manager or simply re-use the code within your own project.
