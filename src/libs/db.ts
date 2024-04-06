import mysql from 'mysql2/promise'

const con ={
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME
}

export const connection =  mysql.createConnection(con)