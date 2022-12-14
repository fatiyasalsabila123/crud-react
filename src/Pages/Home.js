import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../Style/Home.css";
import Swal from "sweetalert2";

export default function Home() {
  const [buku, setBuku] = useState([]);

  const getAll = () => {
    // Axios Untuk melakukan request GET
    axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };

  //useEffect digunakan untuk menambahkan side effect ke function komponen
  useEffect(() => {
    getAll();
  }, []);

  // Axios Untuk melakukan request GET
  const deleteUser = async (id) => {
    Swal.fire({
      title: " apakah yakin data mau di delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
    getAll();
    
  };
  return (
    <div className="container my-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Tahun Terbit</th>
            <th>Pengarang</th>
            {localStorage.getItem("id") !== null ? <th>Action</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {/* //Map adalah kumpulan elemen di mana setiap elemen disimpan sebagai kunci/untuk proses looping data  */}
          {buku.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunTerbit}</td>
                <td>{book.pengarang}</td>
                {localStorage.getItem("id") !== null ? (
                  <td className="action">
                    <a href={"/edit/" + book.id}>
                      <button
                        variant="warning"
                        className="mx-1"
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          border: "none",
                          padding: "5%",
                          paddingLeft: "10%",
                          paddingRight: "10%",
                          borderRadius: "5px",
                        }}
                      >
                        Edit
                      </button>
                    </a>
                    ||
                    <button
                      variant="danger"
                      className="mx-1"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "5%",
                        border: "none",
                        borderRadius: "5px",
                      }}
                      onClick={() => deleteUser(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
