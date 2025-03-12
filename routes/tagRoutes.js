const express = require("express");
const router = express.Router();

const {
  getAllTags,
  deleteTag,
  createTag,
} = require("../controllers/tagsController");

router.get("/", getAllTags);
router.delete("/:id", deleteTag);
router.post("/", createTag);

module.exports = router;
