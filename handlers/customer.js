import Result from 'result'
import {
  getAllPosts, createPost, getCategories, roles, majors, departments, achievements, getPostCard, setCustomerVote, getAllNews, getNewsById,
  getStatisticsForPostCard
} from 'actions/customer'
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
        "title": "Вы предложили идею \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/5",
        "icon": "mdi-heart-outline",
        "title": "Вы оценили идею \"В воскресенье планируется провести мастер класс по выпечке кексов\""
      },
      {
        "id": "/post/6",
        "icon": "mdi-playlist-star",
        "title": "Вы предложили идею \"Необходимо всех обеспечить вентиляторами\""
      },
      {
        "id": "/post/19",
        "icon": "mdi-playlist-star",
        "title": "Вы предложили идею  \"Может устроим зону отдыха в офисе? Как считаете?\""
      },
      {
        "id": "/post/8",
        "icon": "mdi-playlist-star",
        "title": "Вы предложили идею  \"Идем на Ергаки\""
      },
      {
        "id": "/post/21",
        "icon": "mdi-heart-outline",
        "title": "Вы оценили идею \"Предлагаю Новый год отметить поездкой на лыжню базу\""
      },
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

router.get("/post/:id/statistics", async (req, res, next) => {
  try {
    var result = new Result()
    await getStatisticsForPostCard(result, req.params.id)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

router.get("/top", async (req, res, next) => {
  try {
    var result = new Result()

    result.data = [
      [
        {
          "rank": 1,
          "user": "/user/5",
          "fullName": "Байкалов Илья",
          "level": 5,
          "exp": 322,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 12
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 7
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 2
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 14
            }
          ]
        },{
          "rank": 2,
          "user": "/user/4",
          "fullName": "Соколовский Никита",
          "level": 4,
          "exp": 298,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 11
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 6
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 2
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 10
            }
          ]
        },{
          "rank": 3,
          "user": "/user/3",
          "fullName": "Фабричкина Мария",
          "level": 3,
          "exp": 268,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 9
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 7
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 1
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 7
            }
          ]
        },{
          "rank": 4,
          "user": "/user/6",
          "fullName": "Телков Андрей",
          "level": 3,
          "exp": 259,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 6
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 4
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 1
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 7
            }
          ]
        },{
          "rank": 5,
          "user": "/user/12",
          "fullName": "Богачев Иван",
          "level": 2,
          "exp": 183,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 5
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 3
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 0
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 5
            }
          ]
        },{
          "rank": 6,
          "user": "/user/8",
          "fullName": "Сидоров Алексей",
          "level": 2,
          "exp": 180,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 4
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 3
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 0
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 5
            }
          ]
        },
        {
          "rank": 7,
          "user": "/user/9",
          "fullName": "Шишкова Ангелина",
          "level": 2,
          "exp": 174,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 4
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 2
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 0
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 5
            }
          ]
        },
        {
          "rank": 8,
          "user": "/user/10",
          "fullName": "Карамчак Светлана",
          "level": 2,
          "exp": 154,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 2
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 2
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 1
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 5
            }
          ]
        },
        {
          "rank": 9,
          "user": "/user/11",
          "fullName": "Сорока Евгения",
          "level": 1,
          "exp": 98,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 2
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 2
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 1
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 3
            }
          ]
        },
        {
          "rank": 10,
          "user": "/user/7",
          "fullName": "Иванов Иван",
          "level": 1,
          "exp": 95,
          "achieve": [
            {
              "icon": "mdi-text-box-plus-outline",
              "value": 2
            },
            {
              "icon": "mdi-comment-processing-outline",
              "value": 2
            },
            {
              "icon": "mdi-trophy-outline",
              "value": 1
            },
            {
              "icon": "mdi-clock-time-four-outline",
              "value": 2
            }
          ]
        }
      ]
    ]
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})


module.exports = router