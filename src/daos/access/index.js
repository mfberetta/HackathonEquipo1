let accessDao

const { default: AccessDaoMongoDb } = await import('../../models/Access.js')
accessDao = new AccessDaoMongoDb()

export { accessDao }