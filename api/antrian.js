const express = require('express')
const app = express()
const Pool = require('pg').Pool

const db = new Pool({
    user: 'uaetadokirjgkq',
    host: 'ec2-54-235-180-123.compute-1.amazonaws.com',
    database: 'd4q7c8h4j06kav',
    password: '6e55377fd08e351f4fd40d3d315cd0b299db0a88ed79c9e5015681b8ee70ccbb',
    port: 5432,
    ssl: true
})

db.connect()
// get seluruh antrian
app.get('/antrian',async(req, res)=>{
    const resData = await db.query('select * from antrian')
    res.json(resData.rows)
})

// menambah antrian
app.post('/antrian',async(req,res) => {
    try {
        const {nama, nim, jurusan, approveid, deskripsi} = req.body
        await db.query(`insert into antrian(nama, nim, jurusan, approveid, deskripsi)
         values('${nama}', ${nim}, '${jurusan}', ${approveid}, '${deskripsi}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})

// edit antrian
// app.put('/',async(req,res)=>{
//     const {nama, alamat, jabatan} = req.body
//     const id = req.params.id
    
//      await db.query(`update users set nama = '${nama}', umur = ${umur}, alamat = '${alamat}' where nama = '${nama}'`)
//     res.json('data berhasil diubah')
// })


// delete antrian by id
app.delete('/antrian/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM antrian WHERE id = ${id}`)
    res.json('Data terhapus')
})

module.exports = app