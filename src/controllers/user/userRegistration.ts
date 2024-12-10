import { Request, Response } from "express";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { Constants } from "../../contants";
import _ from "lodash";
import { User } from "../../dbStructs/User";
import { ApiResponse } from "../../io/ApiResponse";

export async function RegisterUser(req: Request, res: Response) {
    console.info("RegisterUser invoked")
    let response = new ApiResponse();

    let status = 200;
    if (!req.body.email || req.body.email == "" || !req.body.password || req.body.password == "" || !req.body.name || req.body.name == "" || !req.body.address || req.body.address == "" || !req.body.pincode || req.body.pincode == "") {
        status = 400
        response.error = true
        response.payload = { message: "Invalid request" }
        return res.status(status).json(response)
    }
    let userData: User = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode
    }
    try {
        let postgres = new PostgresOps();
        let dbResponse = await postgres.getUserByEmailPassword(Constants.DB_NAMES.USERS, userData.email, userData.password)
        if (!_.isEmpty(dbResponse)) {
            status = 409
            response.error = true
            response.payload = { message: "User already exists" }
        } else {
            let res = await postgres.insertUser(Constants.DB_NAMES.USERS, userData);
            if (res) {
                status = 200
                response.payload = { message: "Registration success" }
            } else throw "Error registering user";
        }
        postgres.closeConnection();
        if (status == 200) return res.send(response)
        else return res.status(status).json(response)
    } catch (e) {
        console.log("ERROR @register: " + e)
        res.send(500).json({ error: true, message: e })
    }
}

