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
    path: '/api/task',
    validators: [
        authorize,
        body('name').not().isEmpty(),
        body('categoryId').not().isEmpty(),
        body('userId').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { name, description, categoryId, userId } = req.body
                return await prisma.task.create({
                    data: {
                        id: v4(),
                        name,
                        description,
                        categoryId,
                        userId,
                    },
                })
            },
        }),
} as TRoute
