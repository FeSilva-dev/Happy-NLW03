import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import './database/connection'
import routes from './routes'
import errorHandler from './erros/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))) // fazendo com que eu possa visualizar as images, passando um diretorio statico
app.use(errorHandler)


app.listen(3333)

// Rota = conjunto
// Recurso = usuario
// Metodos HTTP = GET/POST/PUT/DELETE
// GET = Buscar uma informação (lista, item)
// POST = Criando informação nova
// PUT = Editando uma informação
// DELETE = Deletando  uma informação
// Parametros Query/Route/Body

// Query: http://localhost:3333/users?search=diego&page=2
// Route: http://localhost:3333/users/1
// Body: http://localhost:3333/users/1