import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Container, Nav, Jumbotron, Table, FormControl, InputGroup, Button, Form, Col, Modal} from 'react-bootstrap'
import Axios from 'axios'

const urlHari = 'http://127.0.0.1:3001/jadwal/hari'
const urlAntrian = 'http://127.0.0.1:3001/antrian'    

class App extends Component{
  state = {
    jadwal:[],
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
        approveid:0,
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
          {/* <Form>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select a day</Form.Label>
              <Form.Control as="select" value={this.state.hari} onChange={this.handleChangeHari}>
                <option value="">Choose...</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
              </Form.Control>
            </Form.Group>
          </Form> 
 */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width:80, textAlign: "center"}}>Jam</th>
                <th style={{textAlign: "center"}}>Konselor</th>
                <th style={{textAlign: "center"}}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jadwal.map((item, index)=>(
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
  {/* 
                <Form.Group controlId="formGridPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control required type="text" placeholder="08XXXXXXXXXX" />
                  <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridDay">
                    <Form.Label>Session</Form.Label>
                    <Form.Control required as="select">
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Control required as="select">
                      <option>8.00</option>
                      <option>9.00</option>
                      <option>10.00</option>
                      <option>11.00</option>
                      <option>13.00</option>
                      <option>14.00</option>
                      <option>15.00</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row> */}

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
                  <Button variant="outline-primary" onClick={()=>this.editDataJadwal(item)}>Approve</Button>
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
      <Container>
        <InputGroup style={{margin:10}} className="mb-3">
         <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">A</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(event)=>this.setState({nama:event.target.value})}
            style={{marginRight:10}}
            placeholder="Nama"
            aria-label="Nama"
            aria-describedby="basic-addon1"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">B</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(event)=>this.setState({umur:event.target.value})}
            style={{marginRight:10}}
            placeholder="Umur"
            aria-label="Umur"
            aria-describedby="basic-addon1"
          />
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">C</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
          onChange={(event)=>this.setState({alamat:event.target.value})}
           style={{marginRight:10}}
            placeholder="Alamat"
            aria-label="Alamat"
            aria-describedby="basic-addon1"
          />
          <Button onClick={()=>this.postDataFromApi()} variant='primary'>ADD</Button>
         </InputGroup>
        {/* Tampilan Table */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Hari</th>
              <th>Jam</th>
              <th>Psikolog</th>
              <th>Ubah Jadwal</th>
            </tr>
          </thead>
          <tbody>
           {this.state.jadwal.map((item, index)=>(
             <tr key={index}>
              <td>{item.hari}</td>
              <td>{item.jam}</td>
              <td>{item.psikolog}</td>
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
          <Nav.Item>
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