import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { param } from 'express-validator'

export default {
    method: 'patch',
    path: '/api/task/:id',
    validators: [authorize, param('id').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const id = req.params.id
                const { name, description, categoryId, priority, isDone } =
                    req.body
                return await prisma.task.update({
                    data: {
                        name,
                        description,
                        categoryId,
                        priority,
                        isDone,
                    },
                    include: {
                        category: true,
                    },
                    where: {
                        id,
                    },
                })
            },
        }),
} as TRoute
