//a function that connect to postgres without sequelize
import { Pool } from 'pg';

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

    async getUserOrAdminByEmailPassword(email: string, password: string, table: string) {
        try {
            let result = await this.pool.query(`SELECT * FROM ${table} WHERE "EMAIL"=$1 AND "PASSWORD"=$2`, [email, password]);
            return result.rows[0];
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