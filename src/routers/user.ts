import express from 'express'
import { RegisterUser } from '../controllers/user/userRegistration';
import { LoginUser } from '../controllers/user/userLogin';

let userRouter = express.Router()

userRouter.get('/login', async (req, res) => {
    await LoginUser(req, res);
});

userRouter.post('/register', async (req, res) => {
    await RegisterUser(req, res);
});

export default userRouter
