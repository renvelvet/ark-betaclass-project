const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3001
const app = Express()

const mahasiswa = require('./api/mahasiswa')
const jadwal = require('./api/jadwal')
const antrian = require('./api/antrian')

app.use(bodyParser())
app.use(cors())
app.use(mahasiswa)
app.use(jadwal)
app.use(antrian)

app.listen(port, ()=>console.log('localhost:3001'))
