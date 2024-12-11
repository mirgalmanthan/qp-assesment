import { Request, Response } from "express";
import { generateAuthToken } from "../../helpers/tokenHelpers";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { Constants } from "../../contants";
import _ from "lodash";
import { ApiResponse } from "../../io/ApiResponse";


export async function AdminLogin(req: Request, res: Response) {
    let userData: any = {
        username: req.body.username,
        password: req.body.password,
    }
    let status = 200
    // let response = {
    //     error: false,
    //     success: true,
    //     payload: {}
    // }
    let response = new ApiResponse();
    let accessToken = ""
    console.log("userdata: " + JSON.stringify(userData))
    try {

        // let userObject = await getDBObject(Admin, { username: userData.username, password: userData.password });
        let postgres = new PostgresOps();
        let dbResponse = await postgres.getAdminByUsernamePassword(userData.username, userData.password, Constants.DB_NAMES.ADMIN);
        if (_.isEmpty(dbResponse)) {
            status = 403
            response.error = true
            response.payload = { message: "Unauthorized user" }
        } else {
            let userObject = dbResponse;
            let tokenObj = {
                username: userObject.username,
                password: userObject.password
            }
            accessToken = generateAuthToken(tokenObj, process.env.JWT_ADMIN_ACCESS_TOKEN_SECRET || "", parseInt(process.env.TOKEN_EXPIRATION_MIN || "2"))
        }
        postgres.closeConnection();
        if (status == 200) return res.json({ error: false, success: true, payload: { accessToken } }).status(status);
        else return res.status(status).json(response)
    } catch (e) {
        console.error("ERROR in AdminLogin : "+e)
        status = 500;
        response.error = true;
        return res.send(status).json(response);
    } 
}