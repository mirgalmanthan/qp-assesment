import { Request, Response } from "express";
import { generateAuthToken } from "../../helpers/tokenHelpers";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { Constants } from "../../contants";
import _ from "lodash";
import { ApiResponse } from "../../io/ApiResponse";

export async function LoginUser(req: Request, res: Response) {
    console.info("LoginUser invoked")
    let status = 200
    let response = new ApiResponse();
    if(!req.body.email || req.body.email == "" || !req.body.password ||  req.body.password == "" ) {
        status = 400
        response.error = true
        response.payload = { message: "Invalid request"}
        return res.status(status).json(response)
    }
    let userData: any = {
        email: req.body.email,
        password: req.body.password,
    }
    
    let accessToken = ""
    console.log("userdata: " + JSON.stringify(userData))
    try {
        // let userObject = await getDBObject(User, { email: userData.email, password: userData.password });
        let postgres = new PostgresOps();
        let dbResponse = await postgres.getUserByEmailPassword(Constants.DB_NAMES.USERS, userData.email, userData.password);
        console.log("dbResponse: " + JSON.stringify(dbResponse))
        if (_.isEmpty(dbResponse)) {
            status = 403
            response.error = true
            response.payload = { message: "Unauthorized user" }
        } else {
            let userObject = dbResponse;
            let tokenObj = {
                userId: userObject["UID"],
                username: userObject["EMAIL"],
                password: userObject["PASSWORD"]
            }
            console.info(tokenObj)
            accessToken = generateAuthToken(tokenObj, process.env.JWT_USER_ACCESS_TOKEN_SECRET || "", parseInt(process.env.TOKEN_EXPIRATION_MIN || "2"))
        }
        postgres.closeConnection();
        if (status == 200) return res.json({ error: false, success: true, payload: { accessToken } }).status(status);
        else return res.status(status).json(response)
    } catch (e) {
        console.error("ERROR in LoginUser : " + e)
        status = 500;
        response.error = true;
        return res.send(status).json(response);
    }
}