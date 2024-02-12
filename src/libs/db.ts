import mysql from 'serverless-mysql'

export const con = mysql({
    config:{
        host: 'inmo-centro-inmo-centro.a.aivencloud.com',
        user: 'avnadmin',
        password: 'AVNS_gkEkm-y3z3y7B9x4t0m',
        port: 16838,
        database: 'defaultdb'
    }
})