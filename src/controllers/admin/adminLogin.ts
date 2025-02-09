import { Request, Response } from "express";
import { generateAuthToken } from "../../helpers/tokenHelpers";
import { PostgresOps } from "../../helpers/postgresHelpers";
import { Constants } from "../../contants";
import _ from "lodash";
import { ApiResponse } from "../../io/ApiResponse";

/**
 * @swagger
 * /admin/login:
 *   get:
 *     summary: Admin login endpoint
 *     tags: [Admin]
 *     description: Authenticate admin user and return JWT token
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin username
 *         example: admin
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin password
 *         example: admin
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT token for authentication
 *       403:
 *         description: Unauthorized user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Unauthorized user
 *       500:
 *         description: Internal server error
 */
export async function AdminLogin(req: Request, res: Response) {
    let userData: any = {
        username: req.query.username,
        password: req.query.password,
    }
    let status = 200
    let response = new ApiResponse();
    let accessToken = ""
    console.log("userdata: " + JSON.stringify(userData))
    try {
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