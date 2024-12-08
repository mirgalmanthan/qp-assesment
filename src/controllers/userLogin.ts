import { Request, Response } from "express";
import { getDBObject } from "../helpers/dbHelpers";
import { generateAuthToken } from "../helpers/tokenHelpers";
import User from "../models/User";

export async function LoginUser(req: Request, res: Response) {
    let userData: any = {
        email: req.body.email,
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
    let userObject = await getDBObject(User, { email: userData.email, password: userData.password });
    if (!userObject) {
        status = 403
        response.error = true
        response.payload = { message: "Unauthorized user" }
    } else {
        let tokenObj = {
            username: userObject.email,
            password: userObject.password
        }
        accessToken = generateAuthToken(tokenObj, process.env.JWT_ACCESS_TOKEN_SECRET || "", parseInt(process.env.TOKEN_EXPIRATION_MIN || "2"))
    }
    if (status == 200) return res.json({ error: false, success: true, payload: { accessToken } }).status(status);
    else return res.status(status).json(response)

}