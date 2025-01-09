import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_DB_URI || '')
    .then((res) => {
      if (res) {
        console.log(`Database connection succeffully to DB`)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
