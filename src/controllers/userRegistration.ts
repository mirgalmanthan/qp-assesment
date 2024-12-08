import { Request, Response } from "express";
import { checkUserExists } from "../helpers/authenticationHelpers";
import { saveDBObject } from "../helpers/dbHelpers";
import User from "../models/User";

export async function RegisterUser(req: Request, res: Response) {
    let userData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        pincode: req.body.pincode
    }
    let status = 200;
    let response = {
        error: false,
        success: true, 
        payload: {}
    }
    try {
        if(await checkUserExists(userData.email, userData.password)) {
            status = 409
            response.error = true
            response.payload = { message: "User already exists"}
        } else {
            await saveDBObject(User, userData)
            response.payload = { message: "Registration success"}
        }
        if(status == 200) return res.send(response)
        else return res.status(status).json(response)
    } catch (e) {
        console.log("ERROR @register: " + e)
        res.send(500).json({ error: true, message: e})
    }
}

