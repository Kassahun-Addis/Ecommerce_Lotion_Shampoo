import express from "express";
import {
  createPostController,
  deletePostController,
  getPostController,
  getSinglePostController,
  postPhotoController,
  updatePostController,
  blogListController
} from "../controllers/postController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-post",
  
  formidable(),
  createPostController
);
//routes
router.put(
  "/update-post/:pid",
  requireSignIn,
  isAdmin,
 formidable(),
  updatePostController
);


//get post 
router.get("/get-post", getPostController);

//single post
router.get("/get-post/:slug", getSinglePostController);

//get photo
router.get("/post-photo/:pid", postPhotoController);

//delete post 
router.delete("/delete-post/:pid", deletePostController);
//product per page
// router.get("/posts-list/:page", blogListController);

export default router;
