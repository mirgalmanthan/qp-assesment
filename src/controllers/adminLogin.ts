import { Request, Response } from "express";
import { getDBObject } from "../helpers/dbHelpers";
import { generateAuthToken } from "../helpers/tokenHelpers";
import Admin from "../models/Admin";

export async function AdminLogin(req: Request, res: Response) {
    let userData: any = {
        username: req.body.username,
        password: req.body.password,
    }
    let status = 200
    let response = {
        error: false,
        success: true,
        payload: {}
    }
    let accessToken = ""
    console.log("userdata: "+JSON.stringify(userData))
    let userObject = await getDBObject(Admin, { username: userData.username, password: userData.password });
    if (!userObject) {
        status = 403
        response.error = true
        response.payload = { message: "Unauthorized user" }
    } else {
        let tokenObj = {
            username: userObject.username,
            password: userObject.password
        }
        accessToken = generateAuthToken(tokenObj, process.env.JWT_ACCESS_TOKEN_SECRET || "", parseInt(process.env.TOKEN_EXPIRATION_MIN || "2"))
    }
    if (status == 200) return res.json({ error: false, success: true, payload: { accessToken } }).status(status);
    else return res.status(status).json(response)

}