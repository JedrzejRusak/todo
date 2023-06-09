import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { prisma } from '../../database'
import { authorize } from '../../utils/middleware.utils'
export default {
    method: 'get',
    path: '/api/category',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => await prisma.category.findMany(),
        }),
} as TRoute
