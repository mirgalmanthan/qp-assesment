import mongoose from "mongoose";

export async function saveDBObject<T>(Clazz: mongoose.Model<T>, obj: T) {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.owsix.mongodb.net/Grocery?retryWrites=true&w=majority&appName=Cluster0`)
        let model = new Clazz(obj)
        let result = await model.save()
        console.log(result)
        mongoose.disconnect();
    } catch (e: any) {
        throw `Error saving data to DB: ${e}`
    }
}

export async function getDBObject<T>(Clazz: mongoose.Model<T>, keyObj: any) {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.owsix.mongodb.net/Grocery?retryWrites=true&w=majority&appName=Cluster0`)
        let result = await Clazz.findOne(keyObj) 
        console.log("Result: "+result)
        mongoose.disconnect(); 
        if(result) {
            return result
        } else {
            return null;
        }
    } catch (e: any) {
        throw `Error getting data from DB: ${e}`
    }
}