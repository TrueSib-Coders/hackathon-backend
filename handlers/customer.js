import Result from 'result'
import { getAllPosts } from 'actions/customer'
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
    await getAllPosts(result, req.body)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.put("/posts", async (req, res, next) => {
  try {
    var result = new Result()
    await getAllPosts(result, req.body)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})


module.exports = router