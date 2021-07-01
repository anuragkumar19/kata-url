import Joi from 'joi'
import express from 'express'

/**
 * @param {Joi.Schema} Schema
 */
export default (Schema) => {
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    return (req, res, next) => {
        const { error, value } = Schema.validate(req.body)

        if (error) {
            res.status(400)
            throw new Error(error.message)
        }

        req.body = value
        next()
    }
}
