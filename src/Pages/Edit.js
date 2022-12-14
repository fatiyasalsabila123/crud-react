import axios from "axios";
import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../Style/Edit.css";
import Swal from "sweetalert2";

const Edit = () => {
  //const adalah singkatan dari constant, yang berarti data dari variabel tidak boleh berubah dan harus selalu konstan.
  const param = useParams();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, settahunTerbit] = useState("");

  const history = useHistory();

  //useEffect digunakan untuk menambahkan side effect ke function komponen
  useEffect(() => {
    axios
      //get untuk menampilkan data
      .get("http://localhost:8000/daftarBuku/" + param.id)
      .then((response) => {
        const newBook = response.data;
        setJudul(newBook.judul);
        setDeskripsi(newBook.deskripsi);
        setPengarang(newBook.pengarang);
        settahunTerbit(newBook.tahunTerbit);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan Sir!" + error);
      });
  }, []);

  const submitActionHandler = async (event) => {
    // sebuah method yang berfungsi untuk mencegah terjadinya event bawaan dari sebuah DOM
    event.preventDefault();

    await Swal.fire({
      title: "Apakah Anda Yakin Untuk Di Edit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            //mengedit data
            .put("http://localhost:8000/daftarBuku/" + param.id, {
              judul: judul,
              deskripsi: deskripsi,
              pengarang: pengarang,
              tahunTerbit: tahunTerbit,
            });

          Swal.fire("Edit!", "Your file has been Edit.", "success");
        }
      })
      .then(() => {
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };

  return (
    <div className="edit">
      <div className="edit mx-5">
        <div className="container my-5">
          <Form onSubmit={submitActionHandler}>
            <div className="name mb-3">
              <Form.Label>
                <strong>Judul</strong>
              </Form.Label>
              <InputGroup className="d-flex gap-3">
                <Form.Control
                  placeholder="Judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <div className="place-of-birth mb-3">
              <Form.Label>
                <strong>Deskripsi</strong>
              </Form.Label>
              <InputGroup className="flex gap-3">
                <Form.Control
                  placeholder="Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </InputGroup>
            </div>

            <div className="birth-date mb-3">
              <Form.Label>
                <strong>Pengarang</strong>
              </Form.Label>
              <div className="d-flex gap-3">
                <Form.Control
                  type="text"
                  value={pengarang}
                  onChange={(e) => setPengarang(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="birth-date mb-3">
              <Form.Label>
                <strong>Tahun Penerbit</strong>
              </Form.Label>
              <div className="d-flex gap-3">
                <Form.Control
                  type="date"
                  value={tahunTerbit}
                  onChange={(e) => settahunTerbit(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end align-item-center mt-2">
              <button
                className="buton btn"
                type="submit"
                style={{ color: "white" }}
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
