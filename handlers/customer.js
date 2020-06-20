import Result from 'result'
import { getAllPosts, createPost, getCategories, roles, majors, departments, achievements } from 'actions/customer'
import express from "express"


const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    var result = new Result()
    result.result = "Ура!"
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.post("/posts", async (req, res, next) => {
  try {
    var result = new Result()
    await getAllPosts(result, req.body, req.user.id)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.post("/post", async (req, res, next) => {
  try {
    var result = new Result()
    console.log(111, req.user);
    console.log(111, req.customer);

    await createPost(result, req.user.id, req.body)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/categories", async (req, res, next) => {
  try {
    var result = new Result()
    await getCategories(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/roles", async (req, res, next) => {
  try {
    var result = new Result()
    await roles(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/majors", async (req, res, next) => {
  try {
    var result = new Result()
    await majors(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/departments", async (req, res, next) => {
  try {
    var result = new Result()
    await departments(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/achievements", async (req, res, next) => {
  try {
    var result = new Result()
    await achievements(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router