import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Container, Nav, Jumbotron, Table, Button, Form, Col, Modal} from 'react-bootstrap'
import Axios from 'axios'

const urlHari = 'http://127.0.0.1:3001/jadwal/hari'
const urlJadwal = 'http://127.0.0.1:3001/jadwal'
const urlAntrian = 'http://127.0.0.1:3001/antrian'    

class App extends Component{
  state = {
    jadwal:[],
    jadwalH:[],
    antrian:[],
    showModal:false,
    hari:'Senin',
    jam:'',
    psikolog:'',
    availability:'',
    nama:'',
    nim:'',
    jurusan:'',
    deskripsi:'',
    approveid:'',
    // ---------- TAMBAH JADWAL -----------
    jPsikolog:'',
    jJam:'',
    jHari:'',
    // untuk detail
    dJam:'',
    dPsikolog:'',
    dAvailability:'',
    dNama:'',
    dNIM:'',
    dJurusan:'',
    dDeskripsi:'',
    dApproveId:'',
    id:''
  }

  constructor(props) {
    super(props)
    
    this.handleChangeHari = this.handleChangeHari.bind(this)
    this.handleChangeJHari = this.handleChangeJHari.bind(this)
    this.handleChangeJJam = this.handleChangeJJam.bind(this)
  }
  
  // jalan ketika setelah render
  componentDidMount(){
    this.getDataFromJadwalHari(this.state.hari)
  }
  
  // pilih hari
  handleChangeHari(event) {
    this.setState({hari: event})
    // this.getDataFromJadwalHari()
  }

  // pilih jurusan
  handleChangeJurusan(event) {
    this.setState({dJurusan: event.target.value})
    
  }
  
  // Ganti JHari
  handleChangeJHari(event) {
    this.setState({jHari: event.target.value})
  }
  // Ganti JJam
  handleChangeJJam(event) {
    this.setState({jJam: event.target.value})
  }
  // -----------------------SHOW/HIDE MODAL-----------------------
  showModal = (item) => {
    const {hari, jam, psikolog} = item
    this.setState({showModal:true, hari:hari, dJam:jam, dPsikolog:psikolog})
    console.log(this.state)
  }
  hideModal = () => {
    this.setState({showModal:false})
  }

  // --------------------POST PUT GET DATABASE--------------------
  // Mendapatkan data dari jadwal
  getDataFromJadwalHari = async(a) => {
    try {
    // Axios.get(url)
    // .then(item => console.log(item))
    // .catch(error=> console.log({error}))
    const url = `${urlHari}/${a}`
    const resData = await Axios.get(url)
    this.setState({jadwalH:resData.data})
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  getDataFromJadwal = async() => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const url = `${urlJadwal}`
      const resData = await Axios.get(url)
      this.setState({jadwal:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }
  // Mendapatkan data dari tabel antrian
  getDataFromAntrian = async() => {
    try {
      // Axios.get(url)
      // .then(item => console.log(item))
      // .catch(error=> console.log({error}))
      const url = `${urlAntrian}`
      const resData = await Axios.get(url)
      this.setState({antrian:resData.data})
      } catch (error) {
        console.log({error})
        alert('terjadi kesalahan')
      }
  }  
  // Menambahkan jadwal
  postDataForJadwal = async() => {
    try {
      await Axios.post(urlJadwal, {
        hari:this.state.jHari,
        jam:this.state.jJam,
        psikolog:this.state.jPsikolog
        // availability:true,
        // approveid:Number(0)
      })
    } catch (err) {
      console.log({err})
      alert('gagal tambah jadwal')
    }
  }
  // Mendaftarkan data mahasiswa untuk sesi konseling
  postDataMahasiswa = async() => {
    
    try {
      // if () {

      // }
      console.log(this.state.hari)
      await Axios.post(urlAntrian,{
        // hari:this.state.hari,
        // jam:this.state.dJam,
        nama:this.state.dNama,
        nim:Number(this.state.dNIM),
        jurusan:this.state.dJurusan,
        approveid:Number(0),
        deskripsi:this.state.dDeskripsi
      
      })
      this.setState({showModal:false})
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  // Mengubah availability
  editDataJadwal = async()=>{
    const {hari, dJam, dPsikolog, dAvailability, dApproveId} = this.state
    this.setState({dAvailability:false, dApproveId:0})
    try {
      await Axios.put(`${urlHari}/${this.state.hari}/jam/${this.state.dJam}`, {
        hari:hari,
        jam:dJam,
        psikolog:dPsikolog,
        availability:dAvailability,
        approveid:dApproveId
      })
      alert('Data berhasil diperbarui')
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  
  User1 = () => {
    const handleSelect = eventKey => {this.getDataFromJadwalHari(eventKey)}
    
    return(
      
        <Container>         
          <Nav variant="tabs" defaultActiveKey="Senin" onSelect={handleSelect} style={{marginBottom:30, marginTop:10}}>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Senin">Senin</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Selasa">Selasa</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Rabu">Rabu</Nav.Link>
            </Nav.Item >
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Kamis">Kamis</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.handleChangeHari()}>
              <Nav.Link eventKey="Jumat">Jumat</Nav.Link>
            </Nav.Item>
          </Nav>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width:80, textAlign: "center"}}>Jam</th>
                <th style={{textAlign: "center"}}>Konselor</th>
                <th style={{textAlign: "center"}}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jadwalH.map((item, index)=>(
                <tr key={index}>
                  {/* <td>{index+1}</td> */}
                  <td>{item.jam}</td>
                  <td>{item.psikolog}</td>
                  <td style={{width:80}}>{item.availability}
                    <Button variant="outline-primary" onClick={()=>this.showModal(item)}>Propose</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal */}
          <Modal show={this.state.showModal} onHide={()=>this.hideModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Pengajuan Jadwal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form style={{marginTop: 30}}>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNama:event.target.value})} 
                    style={{marginBottom:10}} required type="text" placeholder="Enter Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridNIM">
                    <Form.Label>NIM</Form.Label>
                    <Form.Control onChange={(event)=>this.setState({dNIM:event.target.value})}
                    required type="text" placeholder="Enter NIM" />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid NIM.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridJurusan">
                  <Form.Label>Pilih jurusan</Form.Label>
                  <Form.Control required as="select" value={this.state.dJurusan} onChange={(event)=>this.setState({dJurusan:event.target.value})}>
                      <option value="STI">STI</option>
                      <option value="IF">IF</option>
                      <option value="TPSDA">TPSDA</option>
                      <option value="MA">MA</option>
                      <option value="EB">EB</option>
                      <option value="EL">EL</option>
                    </Form.Control>
                  {/* <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                  </Form.Control.Feedback> */}
                </Form.Group>
  
                <Form.Group controlId="formGridDesc">
                  <Form.Label>Description</Form.Label>
                  <Form.Control required type="text" onChange={(event)=>this.setState({dDeskripsi:event.target.value})} 
                    style={{marginBottom:10}} placeholder="Please give a brief description" />
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={()=>this.postDataMahasiswa()}>
                  Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
    )
  }

  User2 = () => {
    
  }
  
  Antrian = () => {
    
    return (
      <Container>
        
        <Table striped bordered hover style={{marginTop:30}}>
          <thead>
            <tr>
            {/* nama, nim, jurusan, approveid, deskripsi */}
              <th style={{textAlign: "center"}}>Hari</th>
              <th style={{textAlign: "center"}}>Jam</th>
              <th style={{width:80, textAlign: "center"}}>Nama</th>
              <th style={{textAlign: "center"}}>NIM</th>
              <th style={{textAlign: "center"}}>Jurusan</th>
              <th style={{textAlign: "center"}}>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {this.state.antrian.map((item, index)=>(
              <tr key={index}>
                {/* <td>{index+1}</td> */}
                <td>{item.hari}</td>
                <td>{item.jam}</td>
                <td>{item.nama}</td>
                <td>{item.nim}</td>
                <td>{item.jurusan}</td>
                <td>{item.deskripsi}</td>
                <td style={{width:80}}>{item.approvedid}
                  <Button variant="outline-primary" onClick={()=>this.editDataJadwal(item)} disabled="true">Approve</Button>
                </td>
                {/* <td >
                  <Button variant='warning' onClick={()=>this.showModal(item)}>Edit/Delete</Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }

  TambahJadwal = () => {
    return (
      <Container style={{marginTop:20}}>
        <Form>
          <Form.Group controlId="formGridPsikolog">
            <Form.Label>Conselor's Name</Form.Label>
            <Form.Control 
              onChange={(event)=>this.setState({jPsikolog:event.target.value})}
              placeholder="Enter Conselor's Name" />
          </Form.Group>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Day</Form.Label>
            <Form.Control as="select" select value={this.state.jHari} onChange={this.handleChangeJHari}>
              <option value="">Choose...</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>                
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Session</Form.Label>
            <Form.Control as="select" select value={this.state.jJam} onChange={this.handleChangeJJam}>
              <option value="">Choose...</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>        
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>                
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>        
              <option value="15:00">15:00</option>
            </Form.Control>
          </Form.Group>

          </Form.Row>

          <Button onClick={()=>this.postDataForJadwal()} variant="primary" type="submit">
          ADD
          </Button>
          </Form>
        
        {/* Tabel Jadwal */}
        <Table striped bordered hover style={{marginTop:20}}>
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam</th>
              <th>Psikolog</th>
              {/* <th>Availability</th> */}
              <th>Ubah Jadwal</th>
            </tr>
          </thead>
          <tbody>
           {this.state.jadwal.map((item, index)=>(
             <tr key={index}>
              <td>{item.hari}</td>
              <td>{item.jam}</td>
              <td>{item.psikolog}</td>
              {/* <td>{item.availability}</td> */}
              {/* <Button variant="success" size="sm">
                Tersedia
              </Button> */}
              <td style={{width:50}}>
                <Button variant='warning' onClick={()=>this.showModal(item)}>Edit/Delete</Button>
              </td>
           </tr>
           ))}
          </tbody>
        </Table>
      </Container>
    )
  }

  Admin = () => {
    return(
      <Router>
        <Container>
        
        <Nav variant="tabs" defaultActiveKey="antrian">
          <Nav.Item>
            <Nav.Link as={NavLink} to="/admin" eventKey="antrian">Antrian</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={()=>this.getDataFromJadwal()}>
            <Nav.Link as={NavLink} to="/tambahjadwal" eventKey="tambahjadwal">Tambah Jadwal</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route exact path="/admin">
            <this.Antrian />
          </Route>
          <Route path="/tambahjadwal">
            <this.TambahJadwal />
          </Route>
        </Switch>

        </Container>
      </Router>
    )
  }
  
  render(){
    
    return (
      <Router>
        <Container>
          <Nav variant="pills" defaultActiveKey="user1" style={{marginTop:10}}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user1" eventKey="user1">User1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user2" eventKey="user2">User2</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>this.getDataFromAntrian()}>
              <Nav.Link as={NavLink} to="/admin" eventKey="admin">Admin</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Jumbotron style={{marginTop:10}}>
            <h1>Selamat Datang di Layanan BK-Online</h1>
            <p>
              Berikut ditampilkan jadwal per hari yang akan diperbarui tiap minggu. Silahkan melakukan pengajuan jadwal 
              sesuai ketersediaan. 
            </p>
          </Jumbotron>
          
          <Switch>
            <Route exact path="/">
              <this.User1 />
            </Route>
            <Route path="/user1">
              <this.User1 />
            </Route>
            {/* <Route path="/user2">
              <User2 />
            </Route>*/}
            <Route path="/admin">
              <this.Admin />
            </Route>
          </Switch>

        </Container>
     </Router>
    )
  }
}

export default App