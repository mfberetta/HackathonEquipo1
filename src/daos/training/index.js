let trainingDao

const { default: TrainingDaoMongoDb } = await import('../../models/Training.js')
trainingDao = new TrainingDaoMongoDb()

export { trainingDao }