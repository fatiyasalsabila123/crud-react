import axios from "axios";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import history, { useHistory }  from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Modal, Form, Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import "../Style/Navigation.css";
import Swal from "sweetalert2";

function Navigation() {
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, settahunTerbit] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  // Async — await adalah salah satu fitur baru dari javascript yang di gunakan untuk menangani hasil dari sebuah promise
  const addUser = async (e) => {
    // agar tidak reload tetapi berlaku hanya 1 file
    e.preventDefault();

    const data = {
      judul: judul,
      deskripsi: deskripsi,
      pengarang: pengarang,
      tahunTerbit: tahunTerbit,
    };
    // Axios Untuk melakukan request GET
    await axios.post("http://localhost:8000/daftarBuku", data);
    Swal.fire("Succes!", "You clicked the button!", "success")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.pushState("/login");
  };

  return (
    <div className="navbar">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-white">Perpustakaan Sederhana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#link" className="text-white">Link</Nav.Link>

              {localStorage.getItem("id") !== null ? (
                <>
                  <button className="btn text-white" onClick={handleShow}>
                    Tambah Buku
                  </button>
                  <button className="nav-item float-right border-0 bg-transparent">
                    <a className="btn text-white" onClick={logout}>Logout</a>
                  </button>
                </>
              ) : (
                <button className="nav-item float-right border-0 bg-transparent">
                  <a className="btn text-white" href="/login">Login</a>
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body  className="form text-white">
          <Form onSubmit={addUser} method="POST" >
            <div className="mb-3">
              <Form.Label>
                <strong>Judul</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                {/* //value = nilai yang di inputkan */}
                <Form.Control
                  placeholder="Masukan Judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                ></Form.Control>
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Masukan Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                ></Form.Control>
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Pengarang</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="text"
                  placeholder="Masukan Nama Pengarang"
                  value={pengarang}
                  onChange={(e) => setPengarang(e.target.value)}
                  required
                ></Form.Control>
              </InputGroup>
            </div>
            <div className="mb-3">
              <Form.Label>
                <strong>Tahun Terbit</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  type="date"
                  value={tahunTerbit}
                  onChange={(e) => settahunTerbit(e.target.value)}
                  required
                ></Form.Control>
              </InputGroup>
            </div>
            <Button
              variant="danger"
              className="mx-1 buton-btl"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              className="mx-1 buton-btl"
              onClick={handleClose}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Navigation;
