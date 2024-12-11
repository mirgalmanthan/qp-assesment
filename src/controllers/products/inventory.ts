import { Request, Response } from "express";
import { ApiResponse } from "../../io/ApiResponse";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { Constants } from "../../contants";
import _ from "lodash";

export async function AddInventory(req: Request, res: Response) {
    console.info("addNewProduct invoked");
    let response = new ApiResponse();
    let status = 200;
    if (!req.body.pid || req.body.pid == "") {
        response.error = true
        response.payload = { message: "Invalid request" }
        return res.status(400).json(response)
    }
    try {
        let postgres = new PostgresOps();
        let result = await postgres.insertInventory(Constants.DB_NAMES.INVENTORY, req.body.pid);
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

export async function GetInventory(req: Request, res: Response) {
    console.info("GetInventory invoked");
    let response = new ApiResponse();
    let status = 200;
    try {
        let postgres = new PostgresOps();
        let productsWithQuantity = await postgres.getInventory(Constants.DB_NAMES.INVENTORY);
        console.log(productsWithQuantity)
        if (_.isEmpty(productsWithQuantity)) {
            response.payload = { message: "No products found" }
            response.error = true;
        } else {
            let allProducts = await postgres.getAllProducts(Constants.DB_NAMES.PRODUCTS);
            if (_.isEmpty(allProducts)) throw  `Something mismatched in  inventory`;
            let inventory = allProducts.map((e) => {
                let inventoryProduct = _.find(productsWithQuantity, (prod) => prod.PRODUCT_ID == e.PID);
                e["quantity"] = inventoryProduct ? inventoryProduct["quantity"] : 0
                return e
            })
            response.payload = inventory;
            response.success = true;
        }
        postgres.closeConnection();
        return res.send(response)
    } catch (e) {
        console.log("ERROR @GetInventory: " + e)
        res.send(500).json({ error: true, message: e })
    }
}