import Joi from 'joi'

export const ShortUrlSchema = Joi.object({
    url: Joi.string().uri().required(),
})

export const CustomUrlSchema = Joi.object({
    url: Joi.string().uri().required(),
    slug: Joi.string()
        .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
        .message('Please provide url friendly slug.')
        .required(),
})

export const SlugSchema = Joi.object({
    slug: Joi.string()
        .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
        .message('Please provide url friendly slug.')
        .required(),
})
