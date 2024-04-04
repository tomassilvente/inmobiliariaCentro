import {createClient} from '@libsql/client'

export const client = createClient({
    url: 'libsql://inmobiliaria-centro-tomassilvente.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIyNjQ5MTksImlkIjoiMjkyNGE5MTctY2FjMC00Y2U4LWFlMmQtYmYzNzZmZDNhYjU5In0.2yI8RO7oMMjVBS0hv1t4f-3MNaTMYjymS_H1R7o9x8XZZePfPt70ZSCDBIFc6rgfHOxiWNEyQHc_7auivyhOAA'
})