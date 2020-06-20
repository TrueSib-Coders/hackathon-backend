import Result from 'result'
import { getAllPosts, createPost, getCategories, roles, majors, departments, achievements, getPostCard, setCustomerVote, getAllNews, getNewsById } from 'actions/customer'
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

router.get("/post/card/:id", async (req, res, next) => {
  try {
    var result = new Result()
    await getPostCard(result, req.params.id, req.user.id)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.put("/post/:id/vote", async (req, res, next) => {
  try {
    var result = new Result()
    await setCustomerVote(result, req.user.id, req.body, req.params.id)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/profile/life", async (req, res, next) => {
  try {
    var result = new Result()

    result.data = {}
    result.data.life = [
      {
        "id": "/post/6",
        "icon": "mdi-heart-outline",
        "title": "Вы поддержали идею \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/6",
        "icon": "mdi-comment-check-outline",
        "title": "Вы приняли участие в обсуждении идеи \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/5",
        "icon": "mdi-playlist-star",
        "title": "Вы предлжили идею \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/5",
        "icon": "mdi-heart-outline",
        "title": "Вы оценили идею \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/6",
        "icon": "mdi-playlist-star",
        "title": "Вы предлжили идею \"Необходимо всех обеспечить вентиляторами\""
      }
    ]

    result.data.icons = [
      {
        "icon": "mdi-text-box-plus-outline",
        "count": 12,
        "title": "идей предложено",
        "description": "за последний месяц"
      },
      {
        "icon": "mdi-chevron-up",
        "count": 37,
        "title": "оценок",
        "description": "за последние две недели"
      },
      {
        "icon": "mdi-comment-processing-outline",
        "count": 7,
        "title": "комментариев",
        "description": "за последнюю неделю"
      },
      {
        "icon": "mdi-star-outline",
        "count": 2,
        "title": "уровня",
        "description": "за последний месяц"
      },
      {
        "icon": "mdi-trophy-outline",
        "count": 1,
        "title": "достижение",
        "description": "за последний месяц"
      },
      {
        "icon": "mdi-clock-time-four-outline",
        "count": 6,
        "title": "часов на портале",
        "description": "за неделю"
      }
    ]
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/news", async (req, res, next) => {
  try {
    var result = new Result()
    await getAllNews(result)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/news/:id", async (req, res, next) => {
  try {
    var result = new Result()
    await getNewsById(result, req.params.id)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router