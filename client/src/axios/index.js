import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const fetchAllPosts = async () => await API.get("/posts");

export const createPost = async (newPost) => await API.post("/posts", newPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const updatePost = async (id, newPost) =>
  await API.put(`/posts/${id}`, newPost);
