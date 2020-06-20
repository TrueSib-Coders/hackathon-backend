class Result {
  constructor() {
    this.data = null
    this.error = null
    this.pagination = null
    this.status = 200
  }

  setUnknownError() {
    this.status = 404
    this.error = { message: "Данные не найдены" }
    return this
  }

    setNotCorrectAuth() {
    this.status = 203
    this.error = { message: "Неверный логин или пароль" }
    return this
  }

  setServerError() {
    this.status = 500
    this.error = { message: "Технические неполадки на сайте" }
    return this
  }

  setNotFound() {
    this.status = 404
    this.error = { message: "Объект не найден" }
    return this
  }

  setUnprocessable() {
    this.status = 422
    this.error = { message: "Некорректные параметры" }
    return this
  }

  setConflict() {
    this.status = 409
    this.error = { message: "Конфликт ресурсов" }
    return this
  }


  setUnauthorized() {
    this.status = 401
    this.error = { message: "Необходимо авторизоваться" }
    return this
  }

  setForbidden() {
    this.status = 403
    this.error = { message: "Недостаточно прав" }
    return this
  }

  setStatus(status) {
    this.status = status
    return this
  }

  setError(error) {
    this.error = error
    return this
  }

  setErrorMessage(message) {
    this.error = { message }
    return this
  }

  setErrorAndStatus(status, message) {
    this.error = { message }
    this.status = status
    return this
  }

  setPagination({ page, perPage, pageCount, total }) {
    this.pagination = {
      page: page || 1,
      perPage: perPage || 10,
      pageCount: pageCount || 1,
      total: total || 1
    }
    return this
  }
}

module.exports = Result