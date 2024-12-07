import express from 'express';
import { AdminLogin } from '../controllers/adminLogin';

let adminRouter = express.Router();

adminRouter.get('/login', async (req, res) => {
    await AdminLogin(req, res);
});

adminRouter.post('/forgotPasssowrd', (req, res) => {

});

export default adminRouter;