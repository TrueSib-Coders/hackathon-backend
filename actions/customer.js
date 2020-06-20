import logger from 'logger'
import { Sequelize, sequelize, post, customer, categories, role, major, department, achievement, customer_post, comment } from 'models'
import moment from "moment"
import { dataToJson } from 'helpers'

const Op = Sequelize.Op;

export const getAllPosts = async (res, data, userId) => {
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

    let allvotes = await customer_post.findAll({})
    allvotes = dataToJson(allvotes)

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

        if (post.department_id) {
          departmentList.forEach(departmentDB => {
            if (post.department_id == departmentDB.id) {
              delete post.department_id
              post.department_id = departmentDB
            }
          });
        }

        post.comments = Math.floor(Math.random() * (50 - 2)) + 2;

        post.vote = null
        allvotes.forEach(vote => {
          if (vote.customer_id == userId && vote.post_id == post.id) {
            post.vote = vote.vote
          }
        });



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

export const getPostCard = async (res, postId, userId) => {

  let postCard = await post.findOne({ where: { id: postId } })
  postCard = dataToJson(postCard)

  let customerObj = null
  if (postCard.customer_id) {
    customerObj = await customer.findOne({ where: { id: postCard.customer_id } })
  }
  customerObj = dataToJson(customerObj)

  let categoryList = await categories.findAll({
    where: {
      id: {
        [Op.in]: postCard.tags
      }
    }
  })
  categoryList = dataToJson(categoryList)

  let departmentObject = await department.findOne({ where: { id: postCard.department_id } })
  departmentObject = dataToJson(departmentObject)

  let allvotes = await customer_post.findAll({
    where: {
      post_id: postCard.id
    }
  })
  allvotes = dataToJson(allvotes)

  let rewievs = await comment.findAll({
    where: {
      post_id: postCard.id
    },
    include: [
      {
        model: customer,
        as: 'customer',
        duplicating: false
      }
    ],
    order: [['id', 'ASC']]
  })
  rewievs = dataToJson(rewievs)

  rewievs.forEach(element => {
    element.customer.fio = element.customer.surname + " " + element.customer.name[0] + ". " + element.customer.patronymic[0] + "."
  });


  postCard.tags = categoryList
  postCard.department = departmentObject
  postCard.allvotes = allvotes
  postCard.rewievs = rewievs

  res.data = postCard
}

export const setCustomerVote = async (res, customer_id, data, postId) => {
  let transaction
  try {
    transaction = await sequelize.transaction()

    const { vote } = data

    let updateVote = await customer_post.findOne({ where: { post_id: postId } })

    await updateVote.update({ customer_id: customer_id, post_id: postId, vote: vote }, { transaction })

    res.data = updateVote
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