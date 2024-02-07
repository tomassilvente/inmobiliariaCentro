import mysql from 'serverless-mysql'

export const con = mysql({
    config:{
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10682151',
        password: 'kTcNmVin2K',
        port: 3306,
        database: 'sql10682151'
    }
})