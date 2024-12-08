import User from "../models/User";
import { getDBObject } from "./dbHelpers";

export async function checkUserExists(email: string, password: string) {
    let userExist = false
    let user = await getDBObject(User, { email })
    if (user) userExist = true;
    return userExist
}