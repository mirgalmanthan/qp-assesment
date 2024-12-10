//a function that connect to postgres without sequelize
import { Pool } from 'pg';
import _ from 'lodash';
import { User } from '../models/User';


export class PostgresOps {
    private pool = new Pool({
        user: "postgres",
        host: 'localhost',
        database: "Grocery",
        password: "Manthan@123",
        port: 5432,
    });
    constructor() {
        this.pool.connect();
    }

    async getAllItems(table: string) {
        try {
            let result = await this.pool.query(`SELECT * FROM ${table}`);
            return result.rows;
        } catch (e) {
            throw e;
        }
    }

    async getItemById(table: string, id: number) {
        try {
            let result = await this.pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
            return result.rows[0];
        } catch (e) {
            throw e;
        }
    }

    async getUserByEmailPassword( table: string, email: string, password: string) {
        let rowFeteched = null;
        try {
            let result = await this.pool.query(`SELECT * FROM ${table} WHERE "EMAIL"=$1 AND "PASSWORD"=$2`, [email, password]);
            rowFeteched = _.isEmpty(result.rows[0]) ? null : result.rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            return rowFeteched;
        }
    }

    async getAdminByUsernamePassword(table: string, username: string, password: string) {
        let rowFeteched = null;
        try {
            let result = await this.pool.query(`SELECT * FROM ${table} WHERE "USERNAME"=$1 AND "PASSWORD"=$2`, [username, password]);
            rowFeteched = _.isEmpty(result.rows[0]) ? null : result.rows[0];
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            return rowFeteched;
        }
    }

    async insertUser(table: string, userInfo: User) {
        try {
            let result = await this.pool.query(`INSERT INTO ${table} ("EMAIL", "PASSWORD", "NAME", "PINCODE", "ADDRESS") VALUES ($1, $2, $3, $4, $5)`, [userInfo.email, userInfo.password, userInfo.name, userInfo.pincode, userInfo.address]);
            return result.rows;
        } catch (e) {
            throw e;
        }
    }

}

export async function createPostgresConnection() {

}

export async function closePostgresConnection(pool: Pool) {
    await pool.end();
}


createPostgresConnection();