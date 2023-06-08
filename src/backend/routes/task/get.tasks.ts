import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { prisma } from '../../database'
import { authorize } from '../../utils/middleware.utils'
export default {
    method: 'get',
    path: '/api/task',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () =>
                await prisma.task.findMany({
                    include: {
                        category: true,
                    },
                }),
        }),
} as TRoute
