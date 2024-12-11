import express from 'express'
import { RegisterUser } from '../controllers/user/userRegistration';
import { LoginUser } from '../controllers/user/userLogin';
import { verifyUserToken } from '../helpers/tokenHelpers';
import { GetInventory } from '../controllers/products/inventory';

let userRouter = express.Router()

userRouter.get('/login', async (req, res) => {
    await LoginUser(req, res);
});

userRouter.post('/register', async (req, res) => {
    await RegisterUser(req, res);
});

userRouter.get('/inventory', verifyUserToken, async (req, res) => {
    await GetInventory(req, res);
});

userRouter.post('/orderItems', (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
});



export default userRouter
