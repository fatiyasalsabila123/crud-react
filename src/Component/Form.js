import axios from "axios";
import React, {useState} from "react";
import "../Style/From.css";

export default function Form() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahunTerbit, settahunTerbit] = useState("");
  const [pengarang, setPengarang] = useState("");

  const addBuku = async (e) => {
    e.preventDefault();//menghindari reload

    try {
      await axios.post("http://localhost:8000/daftarBuku" , {
        judul: judul,
        deskripsi: deskripsi,
        tahunTerbit: tahunTerbit,
        pengarang: pengarang
      })
      window.location.reload();
    }catch(error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>From Tambah Buku</h1>
      <form onSubmit={addBuku}>
        <div className="input">
          <label htmlFor="judul">Judul : </label>
          <input type="text" name="judul" id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} required/>
        </div>
        <div className="input">
          <label htmlFor="deskripsi"> Deskripsi : </label>
          <input type="text" name="deskripsi" id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required/>
        </div>
        <div className="input">
          <label htmlFor="pengarang"> Pengarang : </label>
          <input type="text" name="pengarang" id="pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)} required/>
        </div>
        <div className="input">
          <label htmlFor="tahunTerbit"> Tahun Terbit : </label>
          <input type="date" name="tahunTerbit" id="tahunTerbit" value={tahunTerbit} onChange={(e) => settahunTerbit(e.target.value)} required/>
        </div>
        <br />
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}
