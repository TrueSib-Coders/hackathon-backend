import logger from 'logger'
import { Sequelize, sequelize, post, customer, categories } from 'models'
import { NotFoundError, CustomError } from 'handle-error'
import moment from "moment"
import { dataToJson, deleteFile } from 'helpers'
import Result from 'result'
import { getBaseUrl } from 'utils/'

const Op = Sequelize.Op;

export const getAllPosts = async (res, data) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    //пока без поиска 
    const { sort, department } = data

    let posts = []

    if (!sort) {
      posts = await post.findAll({
        order: [['id', 'DESC']]
      })
    }

    if (sort == 'new')
      posts = await post.findAll({
        order: [['date', 'DESC']]
      })

    //Доделать
    if (sort == 'popular')
      posts = await post.findAll({
        order: [['id', 'DESC']]
      })


    //Доделать
    if (sort == 'discussed')
      posts = await post.findAll({
        order: [['id', 'DESC']]
      })

    posts = dataToJson(posts)

    let customers = await customer.findAll({})
    customers = dataToJson(customers)

    posts.forEach(post => {
      if (post.customer_id) {
        customers.forEach(user => {
          if (user.id == post.customer_id) {
            post.author = user.surname + " " + user.name[0] + ". " + user.patronymic[0] + "."
            post.authorId = "/user/" + user.id
          }
        });
        delete post.customer_id
        post.image = post.image_link
        delete post.image_link

        post.comments = 12
        post.vote = true
        post.tags = ["Еда", "Сотрудники", "Отдых"]
      }
    });

    res.data = posts
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}

export const createPost = async (res, customer_id, data) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    const { title, text, image, tags } = data

    let payload = {
      title: title,
      text: text,
      image_link: image,
      date: moment(),
      rating: 0,
      customer_id: customer_id,
      tags: tags
    }
    
    let postObject = await post.create(payload, { transaction })

    let categoryList = await categories.findAll({
      where: {
        id: {
          [Op.in]: payload.tags
        }
      }
    })
    categoryList = dataToJson(categoryList)

    delete postObject.tags
    postObject.tags = categoryList

    res.data = postObject
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}

function groupBy(arr, key) {
  var newArr = [],
    types = {},
    newItem, i, j, cur;
  for (i = 0, j = arr.length; i < j; i++) {
    cur = arr[i];
    if (!(cur[key] in types)) {
      types[cur[key]] = { type: cur[key], data: [] };
      newArr.push(types[cur[key]]);
    }
    types[cur[key]].data.push(cur);
  }
  return newArr;
}

export const getCategories = async (res) => {

  let categoryList = await categories.findAll({})
  categoryList = dataToJson(categoryList)

  let newList = groupBy(categoryList, 'parentCode')

  res.data = newList

  return
}