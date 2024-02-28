import postModel from "../models/Post.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();



export const createPostController = async (req, res) => {
  try {
    const { title,summery,content} =
      req.fields;
    const { photo } = req.files;
    // //alidation
    // switch (true) {
    //   case !title:
    //     return res.status(500).send({ error: "Title is Required" });
    //   case !summery:
    //     return res.status(500).send({ error: "Summery is Required" });
    //   case !content:
    //     return res.status(500).send({ error: "Content is Required" });
    //   case photo && photo.size > 1000000:
    //     return res
    //       .status(500)
    //       .send({ error: "photo is Required and should be less then 1mb" });
    // }

    const posts = new postModel({ ...req.fields, slug: slugify(title) });
    if (photo) {
        posts.photo.data = fs.readFileSync(photo.path);
        posts.photo.contentType = photo.type;
    }
    await posts.save();
    res.status(201).send({
      success: true,
      message: "posts Created Successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};


// blog list base on page
export const blogListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const blogs = await postModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

//get all blogs
export const getPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: posts.length,
      message: "ALlPosts ",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSinglePostController = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ slug: req.params.slug })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Post Fetched",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single post",
      error,
    });
  }
};

export const postPhotoController = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.pid).select("photo");
    if (post && post.photo && post.photo.data) {
      res.set("Content-Type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    } else {
      return res.status(404).send({ success: false, message: "Photo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
//delete controller
export const deletePostController = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Post Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting post",
      error,
    });
  }
};

//upate producta
export const updatePostController = async (req, res) => {
  try {
    const { title,summery,content } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !summery:
        return res.status(500).send({ error: "Summery is Required" });
      case !content:
        return res.status(500).send({ error: "Content is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const posts = await postModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (photo) {
        posts.photo.data = fs.readFileSync(photo.path);
        posts.photo.contentType = photo.type;
    }
    await posts.save();
    res.status(201).send({
      success: true,
      message: "posts Updated Successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte posts",
    });
  }
};








