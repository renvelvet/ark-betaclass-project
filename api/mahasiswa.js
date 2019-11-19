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
// get seluruh mahasiswa
app.get('/mahasiswa',async(req, res)=>{
    const resData = await db.query('select * from mahasiswa')
    res.json(resData.rows)
})

// get mahasiswa by id
app.get('/mahasiswa/:id',async(req, res)=>{
    const id = req.params.id
    const resData = await db.query(`select * from mahasiswa where id=${id}`)
    res.json(resData.rows)
})

// menambah data 
app.post('/mahasiswa',async(req,res) => {
    try {
        const {nama, nim, jurusan, approveid, deskripsi} = req.body
        await db.query(`insert into mahasiswa(nama, nim, jurusan, approveid, deskripsi)
         values('${nama}', ${nim}, '${jurusan}', ${approveid}, '${deskripsi}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})

// edit mahasiswa by id
app.put('/mahasiswa/:id',async(req,res)=>{
    const {nama, nim, jurusan, approveid, deskripsi} = req.body
    const id = req.params.id
    
    await db.query(`update mahasiswa set nama = '${nama}', nim = ${nim}, jurusan = '${jurusan}', approveid = ${approveid}, deskripsi = '${deskripsi}' 
    where id = ${id}`)
    res.json('data berhasil diubah')
})

// delete mahasiswa by id
app.delete('/mahasiswa/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM mahasiswa WHERE id = ${id}`)
    res.json('Data terhapus')
})

module.exports = app