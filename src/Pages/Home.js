import axios from "axios";
import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import "../Style/Home.css"

export default function Home() {
  const [buku, setBuku] = useState([]);

  const getAll = () => {
    axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  const deleteUser = async (id) => {
    axios.delete("http://localhost:8000/daftarBuku/" + id);
    alert("User Berhasil Dihapus ges.");
    getAll();
    window.location.reload();
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.judul}</td>
                <td>{book.deskripsi}</td>
                <td>{book.tahunTerbit}</td>
                <td>{book.pengarang}</td>
                <td className="action">
                  <a href={"/edit/" + book.id}>
                    <button variant="warning" className="mx-1" style={{backgroundColor: "orange", color : "white", border:"none", padding: "5%", paddingLeft:"10%", paddingRight: "10%", borderRadius: "5px"}}>
                      Edit
                    </button>
                  </a>
                  ||
                  <button
                    variant="danger"
                    className="mx-1" style={{backgroundColor:"red", color: "white", padding: "5%", border:"none", borderRadius: "5px"}}
                    onClick={() => deleteUser(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}