import mongoose from 'mongoose'
import shortId from 'shortid'

const UrlSchema = new mongoose.Schema(
    {
        longUrl: {
            type: String,
            required: true,
        },
        shortId: {
            type: String,
            required: true,
            unique: true,
            default: shortId,
        },
    },
    {
        timestamps: true,
    }
)

UrlSchema.virtual('shortUrl').get(function () {
    const HOST =
        process.env.NODE_ENV === 'development'
            ? `http://localhost:${process.env.PORT}`
            : process.env.HOST

    return `${HOST}/${this.shortId}`
})

export default mongoose.model('Url', UrlSchema)
