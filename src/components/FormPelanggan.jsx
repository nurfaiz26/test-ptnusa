import React, { useState } from 'react';
import axios from 'axios';

const FormPelanggan = () => {
    const [newPelanggan, setNewPelanggan] = useState({
        nama: '',
        alamat: '',
        kota: '',
        telepon: '',
        jenis: 'tunai',
        plafon: ''
    });
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addPelanggan(newPelanggan);
            setNewPelanggan({ 
                kode: '',
                nama: '',
                alamat: '',
                kota: '',
                telepon: '',
                jenis: newPelanggan.jenis,
                plafon: ''
            });
            setErrors({}); 
        }
    };

    const handleBatal = (e) => {
        e.preventDefault();
        setNewPelanggan({
            nama: '',
            alamat: '',
            kota: '',
            telepon: '',
            jenis: newPelanggan.jenis,
            plafon: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const phoneRegex = /^08\d{2}-\d{4}-\d{4}$/;
        const plafonRegex = /^\d{1,3}(?:\.\d{3})*$/;

        if (!phoneRegex.test(newPelanggan.telepon)) {
            newErrors.telepon = 'Format nomor telepon harus: 08xx-xxxx-xxxx';
        }

        if (!plafonRegex.test(newPelanggan.plafon)) {
            newErrors.plafon = 'Format plafon harus: 1.000.000';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addPelanggan = async (newPelanggan) => {
        try {
            await axios.post('http://localhost:4000/pelanggan', newPelanggan);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-4">
            <h2 className="text-xl font-bold mb-4">MASTER PELANGGAN</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaPelanggan">
                        NAMA PELANGGAN
                    </label>
                    <input
                        type="text"
                        placeholder="Nama"
                        value={newPelanggan.nama}
                        onChange={(e) => setNewPelanggan({ ...newPelanggan, nama: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">
                        ALAMAT
                    </label>
                    <input
                        type="text"
                        placeholder="Alamat"
                        value={newPelanggan.alamat}
                        onChange={(e) => setNewPelanggan({ ...newPelanggan, alamat: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kota">
                        KOTA
                    </label>
                    <input
                        type="text"
                        placeholder="Kota"
                        value={newPelanggan.kota}
                        onChange={(e) => setNewPelanggan({ ...newPelanggan, kota: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noTelpon">
                        NO. TELPON
                    </label>
                    <input
                        type="text"
                        placeholder="No. Telepon"
                        value={newPelanggan.telepon}
                        onChange={(e) => setNewPelanggan({ ...newPelanggan, telepon: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                    {errors.telepon && <p className="text-red-500 text-xs">{errors.telepon}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        JENIS PELANGGAN
                    </label>
                    <div className="flex items-center">
                        <input type="radio" id="tunai" name="jenisPelanggan" value="TUNAI" className="mr-2" onChange={(e) => setNewPelanggan({ ...newPelanggan, jenis: 'tunai' })} />
                        <label htmlFor="tunai" className="mr-4">TUNAI</label>

                        <input type="radio" id="kredit" name="jenisPelanggan" value="KREDIT" defaultChecked className="mr-2" onChange={(e) => setNewPelanggan({ ...newPelanggan, jenis: 'kredit' })} />
                        <label htmlFor="kredit">KREDIT</label>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plafon">
                        PLAFON ( RP )
                    </label>
                    <input
                        type="text"
                        placeholder="Plafon"
                        value={newPelanggan.plafon}
                        onChange={(e) => setNewPelanggan({ ...newPelanggan, plafon: e.target.value })}
                        className="border border-gray-300 p-2 rounded w-full"
                        required
                    />
                    {errors.plafon && <p className="text-red-500 text-xs">{errors.plafon}</p>}
                </div>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        SIMPAN
                    </button>
                    <button type="button" onClick={handleBatal} className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
                        BATAL
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPelanggan;
