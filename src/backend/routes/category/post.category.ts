import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { prisma } from '../../database'
import { v4 } from 'uuid'

export default {
    method: 'post',
    path: '/api/category',
    validators: [authorize, body('name').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'name must be unique.' },
            execute: async () => {
                const { name } = req.body
                return await prisma.category.create({
                    data: {
                        id: v4(),
                        name,
                    },
                })
            },
        }),
} as TRoute
