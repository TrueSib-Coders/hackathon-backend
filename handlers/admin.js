import Result from 'result'
import { } from 'actions/admin'
import express from "express"


const router = express.Router();

router.get("/test", async (req, res, next) => {
  try {
    var result = new Result()
    result.data = "test"
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router