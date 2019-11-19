import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom'
import {Container, Nav, Alert, Table, Button, Form, Col, Modal} from 'react-bootstrap'
import Axios from 'axios'

const urlHari = 'http://127.0.0.1:3001/jadwal/hari'  

class App extends Component{
  state = {
    jadwal:[],
    antrian:[],
    showModal:false,
    hari:'',
    jam:'',
    psikolog:'',
    availability:'',
    nama:'',
    nim:'',
    jurusan:'',
    deskripsi:'',
    // untuk detail
    dJam:'',
    dPsikolog:'',
    dAvailability:'',
    dNama:'',
    dNIM:'',
    dJurusan:'',
    dDeskripsi:'',
    id:''
  }

  constructor(props) {
    super(props)
    // this.getDataFromJadwal()
    this.handleChange = this.handleChange.bind(this)
  }
  
  // jalan ketika setelah render
  componentDidMount(){
    // this.getDataFromJadwalHari()
  }
  
  // pilih hari
  handleChangeHari(event) {
    this.setState({hari: event.target.value})
    this.getDataFromJadwalHari()
  }

  // pilih jurusan
  handleChangeJurusan(event) {
    this.setState({dJurusan: event.target.value})
    
  }
  
  // -----------------------SHOW/HIDE MODAL-----------------------
  showModal = (item) => {
    const {jam, psikolog} = item
    this.setState({showModal:true, dJam:jam, dPsikolog:psikolog})
    console.log(this.state)
  }
  hideModal = () => {
    this.setState({showModal:false})
  }

  // --------------------POST PUT GET DATABASE--------------------
  // Mendapatkan data dari jadwal
  getDataFromJadwalHari = async() => {
    try {
    // Axios.get(url)
    // .then(item => console.log(item))
    // .catch(error=> console.log({error}))
    const url = `${urlHari}/${this.state.hari}`
    console.log(this.state.hari + " test");
    const resData = await Axios.get(url)
    this.setState({jadwal:resData.data})
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }  
  // Mendaftarkan data mahasiswa untuk sesi konseling
  postDataMahasiswa = async() => {
    const {hari, dJam, dPsikolog, dNama, dNIM, dJurusan, dDeskripsi} = this.state
    try {
      // if () {

      // }
      await Axios.post(`${urlAntrian}`,{
        hari:hari,
        jam:dJam,
        psikolog:dPsikolog,
        nama:dNama,
        nim:Number(dNIM),
        jurusan:dJurusan,
        deskripsi:dDeskripsi
      })
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  
  User1 = () => {
    return(
      <Container>
        <Form>
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
                  <Form.Control value={this.state.dNama} onChange={(event)=>this.setState({dNama:event.target.value})} 
                  style={{marginBottom:10}} required type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridNIM">
                  <Form.Label>NIM</Form.Label>
                  <Form.Control required type="text" placeholder="Enter NIM" />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid NIM.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridJurusan">
                <Form.Label>Pilih jurusan</Form.Label>
                <Form.Control required as="select" value={this.state.dJurusan} onChange={this.handleChangeJurusan}>
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
                <Form.Control required type="text" value={this.state.dDeskripsi} onChange={(event)=>this.setState({dDeskripsi:event.target.value})} 
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
  
  Admin = () => {
    return(
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
            {/* nama, nim, jurusan, approveid, deskripsi */}
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
                <td>{item.nama}</td>
                <td>{item.nim}</td>
                <td>{item.jurusan}</td>
                <td>{item.deskripsi}</td>
                <td style={{width:80}}>{item.approvedid}
                  <Button variant="outline-primary">Approve</Button>
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
  
  render(){
    return (
      <Router>
        <Container>
          <Alert variant="success" style={{marginTop:10}}>
            <Alert.Heading>Selamat Datang di Layanan BK-Online!</Alert.Heading>
            <p>
              Berikut ditampilkan jadwal per hari yang akan diperbarui tiap minggu. Silahkan melakukan pengajuan jadwal 
              sesuai ketersediaan. 
            </p>
            <hr />
            {/* <p className="mb-0">
              Saya masuk sebagai:
            </p> */}
            <Nav variant="pills" defaultActiveKey="/">
              <Nav.Item>
                <Nav.Link as={NavLink} to="/" activeClassName="selected" eventKey="user1" title="user1">User1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/user2" activeClassName="selected" eventKey="user2" title="user2">User2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/admin" activeClassName="selected" eventKey="admin" title="admin">Admin</Nav.Link>
              </Nav.Item>
            </Nav>
          </Alert>
          
          <Switch>
            <Route exact path="/">
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

