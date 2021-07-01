import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import apiRouter from './api.js'
import Url from '../model/Url.js'

const router = Router({ caseSensitive: true })

router.use('/api', apiRouter)

router.get(
    '/:shortId',
    asyncHandler(async (req, res) => {
        const { shortId } = req.params

        const url = await Url.findOne({ shortId })

        if (!url) {
            res.status(404)
            throw new Error('Not Found')
        }

        res.redirect(url.longUrl)
    })
)

export default router
