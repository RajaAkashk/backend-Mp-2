const Tags = require("../models/tags.model");

exports.getAllTags = async (req, res) => {
  try {
    const allTags = await Tags.find();
    res
      .status(200)
      .json({ message: "Successfully getting all the tags", allTags });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in getting all tags", error: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tags.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      res.status(404).json({ message: "Error in finding the tag" });
    }
    res.status(200), json({ message: "Successfully deleted tag", deletedTag });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in deleting tag", error: error.message });
  }
};
