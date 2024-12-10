import { Request, Response } from "express";
import { ApiResponse } from "../../io/ApiResponse";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { v4 as uuidv4 } from 'uuid';
import { Product } from "../../dbStructs/Product";
import { Constants } from "../../contants";

export async function AddNewProduct(req: Request, res: Response) {
    console.info("addNewProduct invoked");
    let response = new ApiResponse();
    let status = 200;
    if (!req.body.pname || req.body.pname == "" || !req.body.category || req.body.category == "" || !req.body.price || req.body.price == "") {
        response.error = true
        response.payload = { message: "Invalid request" }
        return res.status(400).json(response)
    }
    let product: Product = {
        pid: uuidv4(),
        productName: req.body.pname,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    }
    console.info("Adding Product: "+JSON.stringify(product))
    try {
        let postgres = new PostgresOps();
        let result = await postgres.insertProduct(Constants.DB_NAMES.PRODUCTS, product);
        if (result) {
            status = 200
            response.payload = { message: "Product added successfully" }
        } else {
            throw "Error adding product";
        }
        postgres.closeConnection();
        response.success = true;
        if (status == 200) return res.send(response)
        else return res.status(status).json(response)
    } catch (e) {
        console.log("ERROR @register: " + e)
        res.send(500).json({ error: true, message: e })
    }
}