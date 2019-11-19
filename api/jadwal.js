// referensi psikolog => https://www.ibunda.id/psikolog

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
// get seluruh jadwal
app.get('/jadwal',async(req, res)=>{
    const resData = await db.query('select * from jadwal')
    res.json(resData.rows)
})

// get jadwal by id
// app.get('/jadwal/:id',async(req, res)=>{
//     const id = req.params.id
//     const resData = await db.query(`select * from jadwal where id=${id}`)
//     res.json(resData.rows)
// })

// get jadwal by hari
app.get('/jadwal/hari/:hari',async(req, res)=>{
    const hari = req.params.hari
    const resData = await db.query(`select * from jadwal where hari='${hari}'`)
    res.json(resData.rows)
})

// menambah jadwal
app.post('/jadwal',async(req,res) => {
    try {
        const {hari, jam, psikolog, availability, approveid} = req.body
        await db.query(`insert into jadwal(hari, jam, psikolog, availability, approveid)
         values('${hari}', ${jam}, '${psikolog}', ${availability}, ${approveid})`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})


// edit jadwal
app.put('/jadwal/hari/:hari/jam/:jam',async(req,res)=>{
    const {psikolog, availability, approveid} = req.body
    const hari = req.params.hari
    const jam = req.params.jam
    
    await db.query(`update jadwal set hari = '${hari}', jam = '${jam}', psikolog = '${psikolog}', availability = ${availability}, approveid = ${approveid}
    where hari = '${hari}' and jam = '${jam}'`)
    res.json('data berhasil diubah')
})

// delete jadwal by id
app.delete('/jadwal/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM jadwal WHERE id = ${id}`)
    res.json('Data terhapus')
})

module.exports = app