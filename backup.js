const express = require("express");
const multer = require("multer");
const fs = require("fs");
const convert = require("xml-js");
const entities = require("entities");
var parser = require("fast-xml-parser");
var he = require("he");
const app = express();

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

app.post("/upload", upload.single("file"), async (req, res) => {
  let file = req.file.originalname;
  let jsonFile = req.file.originalname;

  var xml = await require("fs").readFileSync(`${file}`, "utf8");

  var result = convert.xml2json(xml, {
    compact: true,
    spaces: 4,
    ignoreAttributes: true,
    attributeValueFn: (attrValue) => entities.encodeXML(attrValue),
  });
  fs.writeFileSync(`${jsonFile}.json`, result);
  console.log(result);
});

const port = 4000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log("server is running on port number " + port);
});
