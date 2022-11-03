require("dotenv").config();

const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = new express.Router();
const auth = require("../middleware/auth");
const fs = require("fs");
const Blob = require("blob");

const BUCKET = "edelta-connect-dev-serverlessdeploymentbucket-1aqhqqcf4kbon";
aws.config.update({
  secretAccessKey: "X4noUIumRhgkr2d9LZcanRtx/KiSYZv/JmDmMrqX",
  accessKeyId: "AKIASYB5S5IBNPJJ2G7B",
  region: "ap-south-1",
  bucket: "edelta-connect-dev-serverlessdeploymentbucket-1aqhqqcf4kbon",
});
let s3 = new aws.S3({
  accessKeyId: "AKIASYB5S5IBNPJJ2G7B",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const uploadToS3BucketFolder = (filePath) => {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: BUCKET,
      Key: filePath,
      ACL: "public-read",
      Body: "b",
    };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        resolve();
      }
    });
  });
};
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      // console.log("this is req ", req);
      // console.log("this is file ", file);
      cb(
        null,
        "drive/" +
          req.user._id.toString() +
          "/" +
          req.body.Path +
          file.originalname
      ); //use Date.now() for unique file keys
    },
  }),
});

router.post("/upload", auth, upload.single("File"), async (req, res) => {
  // console.log(req.user._id)
  console.log(req.body.File);
  console.log(req.body.Path);
  try {
    res.status(200).send("Succsefully uploded");
  } catch (error) {
    console.log("error :- ", error);
    res.status(400).send("error accure", error);
  }
});

router.post("/createFolder", auth, async (req, res) => {
  console.log(req.body.FolderName);
  console.log(req.user._id);
  console.log("drive/" + req.user._id + "/" + req.body.FolderName + "/");
  try {
    await uploadToS3BucketFolder(
      "drive/" + req.user._id + "/" + req.body.FolderName + "amzone1234.txt"
    );
    res.status(200).send("Succsefully uploded");
  } catch (error) {
    console.log("error :- ", error);
    res.status(400).send("error accure", error);
  }
});
router.get("/list", auth, async (req, res) => {
  const path = req.header("path");
  const id = req.user._id;
  const pathNew = "drive/" + id + "/" + path;
  let r = await s3
    .listObjectsV2({
      Bucket: BUCKET,
      Prefix: "drive/" + id + "/" + path,
    })
    .promise();
  r.Contents.map((item) => {
    item.Key = item.Key.replace(pathNew, "");
  });
  res.send(r);
});

router.get("/totalSize", auth, async (req, res) => {
  const id = req.user._id;
  let r = await s3
    .listObjectsV2({
      Bucket: BUCKET,
      Prefix: "drive/" + id + "/",
    })
    .promise();
  let x = r.Contents.map((item) => item.Size);
  res.send(x);
});

router.get("/download", auth, async (req, res) => {
  const id = req.user._id;
  const pathName = req.header("path");
  console.log(pathName);
  try {
    let x = await s3
      .getObject({
        Bucket: BUCKET,
        Key: "drive/" + id + "/" + pathName,
      })
      .promise();
    console.log(x.Body);
    res.status(200).send(x.Body);
  } catch (error) {
    console.log(error);
    res.status(400).send("file not download error accure");
  }
});

router.delete("/delete", auth, async (req, res) => {
  const pathName = req.header("path");
  const id = req.user._id.toString();
  console.log("id:- ", id, "  pathname :- ", pathName);
  console.log("drive/", id, "/", pathName);
  try {
    const ans = await s3
      .deleteObject({
        Bucket: BUCKET,
        Key: "drive/" + id + "/" + pathName,
      })
      .promise();
    console.log(ans);
    res.status(200).send("File Deleted Successfully" + ans);
  } catch (error) {
    res.status(400).send("file not deleted");
  }
});

router.delete("/deleteone", auth, async (req, res) => {
  var path = req.header("path");
  console.log("currPath :- " + path);
  const id = req.user._id.toString();
  try {
    const ans = await s3
      .deleteObject({
        Bucket: BUCKET,
        Key: "drive/" + id + "/" + pathName,
      })
      .promise();
    res.status(200).send("deleted successfully :- " + ans);
  } catch (error) {
    res.status(400).send("error accuer :- " + error);
  }
});

router.delete("/EmptyRecycleBin", auth, async (req, res) => {
  const id = req.user._id;
  try {
    let r = await s3
      .listObjectsV2({
        Bucket: BUCKET,
        Prefix: "drive/" + id + "/Bin/",
      })
      .promise();
    r.Contents.map(async (item) => {
      console.log(item.Key);
      if (!item.Key.toString().includes("amzone1234.txt")) {
        const ans = await s3
          .deleteObject({
            Bucket: BUCKET,
            Key: item.Key,
          })
          .promise();
      } else {
        console.log(item.Key);
      }
      return true;
    });

    res.status(200).send("file deleted Successfully...");
  } catch (error) {
    res.status(400).send("there is some server side error!!!");
  }
});

module.exports = router;
