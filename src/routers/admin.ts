import express from 'express';
import { AdminLogin } from '../controllers/admin/adminLogin';
import { AddNewProduct as AddNewProduct } from '../controllers/admin/addProduct';
import { verifyToken } from '../helpers/tokenHelpers';
import { AddInventory } from '../controllers/admin/addInventory';

let adminRouter = express.Router();

adminRouter.get('/login', async (req, res) => {
    await AdminLogin(req, res);
});

adminRouter.post('/forgotPasssowrd', (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
});

adminRouter.post('/addNewProduct', verifyToken, async (req, res) => {
    await AddNewProduct(req, res);
});

adminRouter.post('/addInventory', verifyToken, async(req, res) => {
    await AddInventory(req, res);
})

adminRouter.get('/allProducts', verifyToken, (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
});

adminRouter.post('/updateProduct', verifyToken, (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
});

adminRouter.post('/deleteProduct', verifyToken, (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
})

export default adminRouter;