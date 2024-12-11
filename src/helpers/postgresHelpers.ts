//a function that connect to postgres without sequelize
import { Pool } from 'pg';
import _ from 'lodash';
import { User } from '../dbStructs/User';
import { Product } from '../dbStructs/Product';


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

    async getUserByEmailPassword(table: string, email: string, password: string) {
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
            return result.rowCount;
        } catch (e) {
            throw e;
        }
    }

    async insertProduct(table: string, productInfo: Product) {
        try {
            let result = await this.pool.query(`INSERT INTO ${table} ("PID", "PRODUCT_NAME", "CATEGORY", "PRICE", "DESCRIPTION", "IMAGE") VALUES ($1, $2, $3, $4, $5, $6)`, [productInfo.pid, productInfo.productName, productInfo.category, productInfo.price, productInfo.description, productInfo.image]);
            console.log(result)
            return result.rowCount;
        } catch (e) {
            throw e;
        }
    }

    async getAllProducts(table: string) {
        try {
            let result = await this.pool.query(`SELECT * FROM ${table}`);
            return result.rows;
        } catch (e) {
            throw e;
        }
    }
    async updateProduct(table: string, productInfo: Product) {
        try {
            // Construct the UPDATE query using parameterized queries to prevent SQL injection.
            const query = `
                UPDATE ${table}
                SET "PRODUCT_NAME" = $1, "CATEGORY" = $2, "PRICE" = $3, "DESCRIPTION" = $4, "IMAGE" = $5
                WHERE "PID" = $6
            `;
            const values = [
                productInfo.productName,
                productInfo.category,
                productInfo.price,
                productInfo.description,
                productInfo.image,
                productInfo.pid,
            ];

            const result = await this.pool.query(query, values);
            return result.rowCount;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error; // Re-throw the error to be handled by the calling function.
        }
    }

    async removeProduct(table: string, pid: string) {
        try {
            let result = await this.pool.query(`DELETE FROM ${table} WHERE "PID"=$1`, [pid]);
            return result.rowCount;
        } catch (e) {
            throw e;
        }
    }

    async insertInventory(table: string, pid: string) {
        try {
            let result = await this.pool.query(`INSERT INTO ${table} ("PRODUCT_ID") VALUES ($1)`, [pid]);
            return result.rowCount;
        } catch (e) {
            throw e;
        }
    }

    async getInventory(table: string) {
        // let query = category ? `SELECT * FROM ${table} WHERE "CATEGORY"=${category}` : `SELECT * FROM ${table}`;
        let query = `SELECT "PRODUCT_ID", COUNT(*) AS quantity FROM ${table} GROUP BY "PRODUCT_ID";`
        try {
            let result = await this.pool.query(query);
            return result.rows;
        } catch (e) {
            throw e;
        }
    }

    closeConnection() {
        this.pool.end();
    }
}

