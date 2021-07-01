import { Router } from 'express'
import asyncHandler from 'express-async-handler'

import validate from '../middlewares/validate.js'
import {
    CustomUrlSchema,
    ShortUrlSchema,
    SlugSchema,
} from '../utils/ValidationSchemas.js'
import Url from '../model/Url.js'

const router = Router()

/**
 * @route POST /api/shortUrl
 * @description Short a url
 */
router.post(
    '/shortUrl',
    validate(ShortUrlSchema),
    asyncHandler(async (req, res) => {
        let url = await Url.findOne({
            longUrl: req.body.url,
        })

        if (!url) {
            url = await Url.create({ longUrl: req.body.url })
            res.status(201)
        }

        res.json({ data: url })
    })
)

/**
 * @route POST /api/customUrl
 * @description Short a url with custom slug
 */
router.post(
    '/customUrl',
    validate(CustomUrlSchema),
    asyncHandler(async (req, res) => {
        let url = await Url.findOne({
            shortId: req.body.slug,
        })

        if (url || req.body.slug.match(/api/gi)) {
            res.status(400)
            throw new Error('Slug already taken.')
        }

        url = await Url.create({
            longUrl: req.body.url,
            shortId: req.body.slug,
        })

        res.status(201).json({ data: url })
    })
)

/**
 * @route POST /api/available
 * @description Check slug's availablity
 */
router.post(
    '/available',
    validate(SlugSchema),
    asyncHandler(async (req, res) => {
        let available = true

        let url = await Url.findOne({
            shortId: req.body.slug,
        })

        if (url) {
            available = false
        }

        if (req.body.slug.match(/api/gi)) {
            available = false
        }

        res.status(200).send({ data: { available } })
    })
)

export default router
