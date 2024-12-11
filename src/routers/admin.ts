import express from 'express';
import { AdminLogin } from '../controllers/admin/adminLogin';
import { AddNewProduct as AddNewProduct, getAllProducts, removeProduct, updateProduct } from '../controllers/products/product';
import { verifyAdminToken } from '../helpers/tokenHelpers';
import { AddInventory, GetInventory } from '../controllers/products/inventory';

let adminRouter = express.Router();

adminRouter.get('/login', async (req, res) => {
    await AdminLogin(req, res);
});

adminRouter.post('/forgotPasssowrd', (req, res) => {
    //implementation pending
    res.status(200).send("Working in Progress")
});

adminRouter.post('/addNewProduct', verifyAdminToken, async (req, res) => {
    await AddNewProduct(req, res);
});

adminRouter.post('/addInventory', verifyAdminToken, async(req, res) => {
    await AddInventory(req, res);
})

adminRouter.get('/inventory', verifyAdminToken, async (req, res) => {
    await GetInventory(req, res);
});

adminRouter.post('/updateProduct', verifyAdminToken, async (req, res) => {
    await updateProduct(req, res);
});

adminRouter.get('/allProducts', verifyAdminToken, async (req, res) => {
    await getAllProducts(req, res);
})

adminRouter.delete('/removeProduct', verifyAdminToken, async (req, res) => {
    await removeProduct(req, res);
})

export default adminRouter;