import logger from 'logger'
import { Sequelize, sequelize, post, customer, categories, role, major, department, achievement } from 'models'
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
    const { sort } = data

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

    let categoryList = await categories.findAll({})
    categoryList = dataToJson(categoryList)

    let departmentList = await department.findAll({})
    departmentList = dataToJson(departmentList)


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

        post.comments = Math.floor(Math.random() * (50 - 2)) + 2;
        post.vote = Math.random() >= 0.5

        if (post.tags) {
          let currentList = []
          post.tags.forEach(element => {
            categoryList.forEach(categoryDB => {
              if (element == categoryDB.id) {
                currentList.push(categoryDB)
              }
            });
          });
          delete post.tags
          post.tags = currentList
        }

        if (post.department_id) {
          departmentList.forEach(departmentDB => {
            if (post.department_id == departmentDB.id) {
              delete post.tags
              post.department_id = departmentDB
            }
          });
        }

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

    const { title, text, image, tags, department_id } = data

    let payload = {
      title: title,
      text: text,
      image_link: image,
      date: moment(),
      rating: 0,
      customer_id: customer_id,
      tags: tags,
      department_id: department_id
    }

    let postObject = await post.create(payload, { transaction })

    postObject = dataToJson(postObject)

    let categoryList = await categories.findAll({
      where: {
        id: {
          [Op.in]: payload.tags
        }
      }
    })
    categoryList = dataToJson(categoryList)

    if (department_id) {

      let departmentObj = await department.findOne({ where: { id: department_id } })

      postObject.department = {
        id: department_id,
        department_name: departmentObj.department_name
      }

      delete postObject.department_id
    }

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

export const roles = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    let roles = await role.findAll({})
    if (!roles) {
      res.data = []
      return
    }

    res.data = roles
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

export const majors = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    let majors = await major.findAll({})
    if (!majors) {
      res.data = []
      return
    }

    res.data = majors
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

export const departments = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    let departments = await department.findAll({})
    if (!departments) {
      res.data = []
      return
    }

    res.data = departments
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

export const achievements = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    let achievements = await achievement.findAll({})
    if (!achievements) {
      res.data = []
      return
    }

    res.data = achievements
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