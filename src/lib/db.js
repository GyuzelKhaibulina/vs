import mysql from 'mysql2/promise';

export async function query({query, values = []})
{

    const dbConnection = await mysql.createConnection ({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });

    try {
        const [results]  = await dbConnection.execute (query, values);
        dbConnection.end();
        return results;
    }
    catch (error) {
        throw Error(error.message);
        return {error};
    }
};