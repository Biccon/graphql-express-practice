import express from "express"; 
import jwt from "jsonwebtoken";
import config from "../../config";

const router = express.Router(); 
router.get("/comments", (req, res) => {
  res.json("All comments");
});

router.post("/comments/create", auth, (req, res) => {});

module.exports = router;
