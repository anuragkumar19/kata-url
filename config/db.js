import mongoose from 'mongoose'

export default async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })

        console.log(
            `Mongodb Connected : ${conn.connection.host}`.yellow.underline.bold
        )
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
