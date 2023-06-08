import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import postCategory from './category/post.category'
import getCategories from './category/get.categories'
import patchCategory from './category/patch.category'
import deleteCategory from './category/delete.category'
import postTask from './task/post.task'
import getTask from './task/get.tasks'
import deleteTask from './task/delete.task'
import patchTask from './task/patch.task'
const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    postCategory,
    getCategories,
    deleteCategory,
    postTask,
    getTask,
    deleteTask,
    patchTask,
    patchCategory,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
export default router
