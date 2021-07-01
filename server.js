import express from 'express'
import cors from 'cors'
import 'colors'
import morgan from 'morgan'
import { config as dotenvConfig } from 'dotenv'

import router from './routes/index.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errors.js'

const app = express()

// Load env vars
dotenvConfig()

// Connect to db
connectDB()

// Enable CORS
app.use(cors())

// Accept JSON
app.use(express.json())

// Logger
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

// Router
app.use(router)

// Error Handlers
app.use(notFound).use(errorHandler)

const PORT = process.env.PORT || 3245

app.listen(PORT, () =>
    console.log(
        `Server started in ${process.env.NODE_ENV} on port ${PORT}`.blue
            .underline.bold
    )
)
