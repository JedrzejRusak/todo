import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { param } from 'express-validator'

export default {
    method: 'patch',
    path: '/api/category/:id',
    validators: [authorize, param('id').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const id = req.params.id
                const { name } = req.body
                return await prisma.category.update({
                    data: {
                        name,
                    },
                    where: {
                        id,
                    },
                })
            },
        }),
} as TRoute
