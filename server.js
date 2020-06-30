const express = require("express");
const multer = require("multer");
const fs = require("fs");
var xmldoc = require("xmldoc");
const app = express();
var parseString = require("xml2js").parseString;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("*", (req, res) => {
  res.send(`
   <form action="/upload" method="post" enctype="multipart/form-data" >
         <input type="file" class="form-control" name="file"  placeholder="upload photo">
         <button>Submit</button>
    </form>
    `);
});

app.post("/upload", upload.single("file"), (req, res) => {
  let file = req.file.originalname;
  let jsonFile = req.file.originalname;

  const fs = require("fs");
  const parseString = require("xml2js").parseString;
  const fileToParse = `${file}`;
  const outputFilename = `${jsonFile}.json`;

  fs.readFile(fileToParse, { encoding: "utf16le" }, function (err, data) {
    parseString(data, function (err, result) {
      console.dir(result);
      if (err) {
        console.log(err);
      }
      // do something with the JS object called result, or see below to save as JSON
      fs.writeFile(`${jsonFile}.json`, JSON.stringify(result), (writeErr) => {
        if (writeErr) throw writeErr;
        console.log("The file has been saved to " + outputFilename);
      });
    });
  });
});

const port = 4000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server is running on port number " + port);
});
