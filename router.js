const express = require("express");
const router = express.Router();
const fileparser = require('./fileparser');

// Middleware to log requests
router.use((request, response, next) => {
  console.log("middleware! router");
  next();
});
router.use(express.static('public')); // Serve static files from the 'public' directory

// Define the GET endpoint
router.route("/").get(async (req, res, next) => {
  try {
    res.send(`
         <div class="container mx-auto mt-8">
        <h2 class="text-2xl font-bold mb-4">File Upload With <code>"Node.js"</code></h2>
        <form action="/api/upload" enctype="multipart/form-data" method="post">
          <div class="mb-4">
            <label for="file" class="block text-sm font-medium text-gray-700">Select a file:</label>
            <input type="file" id="file" name="file" multiple class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Upload
          </button>
        </form>
      </div>
          `);
  } catch (error) {
    next(error);
  }
});

router.route('/api/upload').post(async (req,res,next)=>{
    try {
        await fileparser(req)
        .then(data => {
          res.status(200).json({
            message: "Success",
            data
          })
        })
        .catch(error => {
          res.status(400).json({
            message: "An error occurred.",
            error
          })
        })
    } catch (error) {
        next();
    }
});
  

module.exports = router;
