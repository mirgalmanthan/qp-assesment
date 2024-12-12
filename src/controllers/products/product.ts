import { Request, Response } from "express";
import { ApiResponse } from "../../io/ApiResponse";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { v4 as uuidv4 } from 'uuid';
import { Product } from "../../dbStructs/Product";
import { Constants } from "../../contants";
import _ from "lodash";

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
        postgres.closeConnection();
        if (status == 200) return res.send(response)
        else return res.status(status).json(response)
    } catch (e) {
        console.log("ERROR @register: " + e)
        res.send(500).json({ error: true, message: e })
    }
}

export async function removeProduct(req: Request, res: Response) {
    console.info("removeProduct invoked");
    let response = new ApiResponse();
    let status = 200;
    if(!req.query.pid || req.query.pid == "") {
        response.error = true
        response.payload = { message: "Invalid request"}
        return res.status(400).json(response)
    }
    let pid = req.query.pid as string;
    try {
        let postgres = new PostgresOps();
        let result = await postgres.removeProduct(Constants.DB_NAMES.PRODUCTS, pid);
        if(result) {
            status = 200
            response.payload = { message: "Product removed successfully" }
        } else {
            throw "Error removing product";
        }
        postgres.closeConnection();
        return res.send(response);
    } catch (e) {
        console.log("ERROR @removeProduct: " + e)
        res.send(500).json({ error: true, message: e })
    }
}

export async function getAllProducts(req: Request, res: Response) {
    console.info("getAllProducts invoked");
    let response = new ApiResponse();
    let status = 200;
    try {
        let postgres = new PostgresOps();
        let dbResponse: Product[] = await postgres.getAllItems(Constants.DB_NAMES.PRODUCTS); 

        if (_.isEmpty(dbResponse)) {
            response.payload = { message: "No products found" };
            response.error = true;
        } else {
            response.payload = dbResponse;
            response.success = true;
        }
        postgres.closeConnection();
        return res.status(status).json(response); 
    } catch (e) {
        console.log("ERROR @getAllProducts: " + e);
        return res.status(500).json({ error: true, message: e }); 
    }
}


export async function updateProduct(req: Request, res: Response) {
    console.info("updateProduct invoked");
    let response = new ApiResponse();
    let status = 200;
    console.log(req.body)
    if (!req.body.pid ||  req.body.pid == '' || 
        !req.body.productName ||  req.body.productName == '' ||
        !req.body.price ||  req.body.price == '' ||
        !req.body.category ||  req.body.category == '') {
        response.error = true;
        response.payload = { message: "Invalid request: Missing or incorrect data types for required fields." };
        return res.status(400).json(response);
    }

    let product: Product = {
        pid: req.body.pid,
        productName: req.body.productName,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image
    }


    try {
        let postgres = new PostgresOps();
        const updateResult = await postgres.updateProduct(Constants.DB_NAMES.PRODUCTS, product); 

        if (updateResult) {
            response.success = true;
            response.payload = { message: "Product updated successfully", updatedProduct: req.body }; //Return updated product data if needed.
        } else {
            response.error = true;
            response.payload = { message: "Failed to update product." };
            status = 500; 
        }
        postgres.closeConnection();
        return res.status(status).json(response);
    } catch (e) {
        console.error("ERROR @updateProduct: ", e);
        return res.status(500).json({ error: true, message: "Server error: " + e });
    }
}