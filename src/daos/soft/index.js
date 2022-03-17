let softDao

const { default: SoftDaoMongoDb } = await import('../../models/Soft.js')
softDao = new SoftDaoMongoDb()

export { softDao }