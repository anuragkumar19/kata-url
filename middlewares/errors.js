import express from 'express'
import { sentenceCase } from 'sentence-case'

/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const errorHandler = (err, req, res, next) => {
    res.statusCode === 200 ? res.status(500) : res.status(res.statusCode)

    // Handle JSON parse error
    err.type === 'entity.parse.failed' && res.status(400)

    let message

    if (res.statusCode === 500) {
        console.log(err)
        message = 'Server Error!'
    }

    res.json({
        message: message || sentenceCase(err.message.replaceAll('"', '')),
    })
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' })
}
