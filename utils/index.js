export const getBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.APP_BASE_URL
    case 'local':
      return `http://${process.env.APP_HOST}:${process.env.APP_PORT}`
    default:
      return process.env.APP_BASE_URL
  }
}

export const getFileUrl = (file, folder) => {
  return `${getBaseUrl()}/uploads${folder ? `/${folder}/` : "/"}${file}`
}