import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";


/**
 * Register -> Generate token with refresh token  -> Add details to db 
 * Login -> Genrate accesstoken from refresh token of db -> Keep session alive until access token is valid
 */
 

export function generateAuthToken(userData: any, secret: string, expiry?: number){
    let token = expiry ?  jwt.sign(userData, secret, {
        expiresIn: `${expiry}m`
    }) : jwt.sign(userData, secret)
    return token;
}

export function verifyAdminToken(request: Request, response: Response, next: NextFunction) {
    console.log("verify token invoked");
    let token = request.headers.authorization?.replace("Bearer", "").trim() || ""
    console.log("token:"+token)
    try {
        let payload = jwt.verify(token,  process.env.JWT_ADMIN_ACCESS_TOKEN_SECRET|| "")
        console.log("payload")
        console.log(payload)
        if(payload && typeof(payload != "string")) {
            console.log("payload found")
            next()
            return
        } else return response.status(403);
    } catch(e) {
        return response.status(403).json({
            "error": true,
            "error_payload": {
                "message": "Invalid token"
            }
        })
    }
}

export function verifyUserToken(request: Request, response: Response, next: NextFunction) {
    console.log("verify token invoked");
    let token = request.headers.authorization?.replace("Bearer", "").trim() || ""
    console.log("token:"+token)
    try {
        let payload = jwt.verify(token,  process.env.JWT_USER_ACCESS_TOKEN_SECRET|| "")
        console.log("payload")
        console.log(payload)
        request.body.userId = typeof payload !="string" ? payload.userId : ""
        if(payload && typeof(payload != "string")) {
            console.log("payload found")
            next()
            return
        } else return response.status(403);
    } catch(e) {
        return response.status(403).json({
            "error": true,
            "error_payload": {
                "message": "Invalid token"
            }
        })
    }
}