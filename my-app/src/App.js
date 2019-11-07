import React,{Component} from 'react'
import {InputGroup, FormControl, Container, Button, Table, Modal} from 'react-bootstrap'
import Axios from 'axios'

const url = 'http://192.168.1.10:3001'

class App extends Component{
  state = {
    data:[],
    showModal:false,
    nama:'',
    umur:'',
    alamat:'',
    // untuk detail
    dNama:'',
    dUmur:'',
    dAlamat:'',
    id:''
  }
  constructor(props){
    super(props)
    // this.getDataFromApi()
  }
  // jalan ketika setelah render
  componentDidMount(){
    this.getDataFromApi()
  }
  //mendapatkan data dari api
  getDataFromApi = async() => {
    try {
    // Axios.get(url)
    // .then(item => console.log(item))
    // .catch(error=> console.log({error}))
    const resData = await Axios.get(url)
    this.setState({data:resData.data})
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }

  postDataFromApi = async()=>{
    try {
      if(!isNaN(this.state.umur)){
        await Axios.post(url,{
          nama:this.state.nama,
          umur:Number(this.state.umur),
          alamat:this.state.alamat
        })
        alert('Data Berhasil Ditambah')
      } else {
        alert('Umur Harus Nomor')
      }
      this.getDataFromApi()
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }
  editDataApi = async()=>{
    const {id, dUmur, dAlamat, dNama} = this.state
    try {
      if(!isNaN(dUmur)){
        await Axios.put(`${url}/${id}`,{
          nama:dNama,
          umur:Number(dUmur),
          alamat:dAlamat
        })
        alert('Data Berhasil Diubah')
        this.setState({showModal:false})
        this.getDataFromApi()
      } else {
        alert('Umur Harus Nomor')
      }
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }

  deleteDataApi = async() => {
    try {
      const {id} = this.state
      await Axios.delete(`${url}/${id}`)
      alert('Data Berhasil dihapus')
      this.setState({showModal:false})
      this.getDataFromApi()
    } catch (error) {
      console.log({error})
      alert('terjadi kesalahan')
    }
  }

  showModal = (item) => {
    const {id, umur, alamat, nama} = item
    this.setState({showModal:true, id:id, dUmur:umur, dAlamat:alamat, dNama:nama})
    console.log(this.state)
  }

  hideModal = () => {
    this.setState({showModal:false})
  }

  render(){
    return (
      <Container>
        {/* Tampilan From */}
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
              <th>Nama</th>
              <th>Umur</th>
              <th>Alamat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {this.state.data.map((item, index)=>(
             <tr key={index}>
              <td>{index+1}</td>
              <td>{item.nama}</td>
              <td>{item.umur}</td>
              <td>{item.alamat}</td>
              <td style={{width:50}}>
                <Button variant='warning' onClick={()=>this.showModal(item)}>Edit/Delete</Button>
              </td>
           </tr>
           ))}
          </tbody>
        </Table>
        {/* Modal */}

        <Modal show={this.state.showModal} onHide={()=>this.hideModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl 
          value={this.state.dNama} 
          onChange={(event)=>this.setState({dNama:event.target.value})} 
          style={{marginBottom:10}} 
          placeholder='Nama'
          />
          <FormControl 
          value={this.state.dUmur} 
          onChange={(event)=>this.setState({dUmur:event.target.value})} 
          style={{marginBottom:10}} 
          placeholder='Umur'
          />
          <FormControl 
          value={this.state.dAlamat} 
          onChange={(event)=>this.setState({dAlamat:event.target.value})} 
          style={{marginBottom:10}} 
          placeholder='Alamat'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>this.deleteDataApi()}>
            Delete
          </Button>
          <Button variant="primary" onClick={()=>this.editDataApi()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    )
  }
}

export default App