import { Router } from "express";
import {
  createPost, getAll, getById,
  getMyPosts, deletePost, updatePost, getPostComments
} from "../controllers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();


// Create post 
// http://localhost:3002/api/posts/
router.post('/', checkAuth, createPost)

// Get all
// http://localhost:3002/api/posts/
router.get('/', getAll)

// Get by ID
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// Get my posts
// http://localhost:3002/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

// Delete post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, deletePost)

// Update post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// http://localhost:3002/api/posts/comments/:id
router.get('/comments/:id', getPostComments)


export default router