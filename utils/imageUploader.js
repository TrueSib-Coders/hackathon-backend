const uuidv4 = require('uuid/v4')
const sharp = require('sharp')
const path = require('path')
import logger from 'logger'

export const resizeAndSave = async (buffer, fileName, folderName, width) => {

  const filePath = path.join(__dirname, "../public/uploads/", folderName, fileName)

  try {
    await sharp(buffer.data).resize({ width }).toFile(filePath)
    logger.debug('Изображение удачно сохранено: ', {filePath})
    return true
  }
  catch (error) {
    logger.debug('Изображение не было сохранено: ', error )
    return false
  }

}

const resize = async (buffer, width, height) => {
  let resizeParam = Object.assign({}, width ? { width } : {}, height ? { height } : {})
  const fileName = uuidv4() + ".jpg"
  const filePath = path.join(__dirname, "../uploads", fileName)

  try {
    await sharp(buffer).resize(resizeParam).toFile(filePath)
    return filePath
  }
  catch (error) {
    console.log('error: resize', error)
  }
}

exports.save = async (files) => {
  if (files) {
    if (files instanceof Array) {
      if (files.length) {
        let filesPathes = []
        for (let file of files) {
          let sm = await resize(file, 100)
          let md = await resize(file, 200)
          let lg = await resize(file, 300)
          filesPathes.push({ sm, md, lg })
        }
        return filesPathes
      }
    }
    else if (files instanceof Object) {
      let sm = await resize(files, 100)
      let md = await resize(files, 200)
      let lg = await resize(files, 300)
      return { sm, md, lg }
    }
  }
}




exports.saveManyFiles = async (im, folder = null, size = null) => {
  let images = Array.isArray(im) ? im : [im]

  let result = await Promise.all(images.map(async (image) => {
    let fileName = uuidv4() + ".jpg"
    if(size)
    {
      await resizeAndSave(image, fileName, folder, size)
    }
    else
    {
      const filePath = path.join(__dirname, "../public/uploads/", folder ?? "", fileName)
      await sharp(image.data).toFile(filePath)
    }
    return fileName
  }))

  return result
}

exports.saveImage = async(im, folder = null, size = null) => {
  let fileName = uuidv4() + ".jpg"
  if(size)
  {
    await resizeAndSave(im, fileName, folder, size)
  } 
  else
  {
    const filePath = path.join(__dirname, "../public/uploads/", folder ?? "", fileName)
    await sharp(im.data).toFile(filePath)
  }
  return fileName
}