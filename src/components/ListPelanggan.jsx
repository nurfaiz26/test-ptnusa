import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListPelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPelanggan = async () => {
        try {
            const response = await axios.get('http://localhost:4000/pelanggan');
            setPelanggan(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPelanggan();
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-4">
            <h2 className="text-xl font-bold text-center mb-4">DAFTAR PELANGGAN</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">KODE</th>
                        <th className="border border-gray-300 p-2">NAMA</th>
                        <th className="border border-gray-300 p-2">ALAMAT</th>
                        <th className="border border-gray-300 p-2">KOTA</th>
                        <th className="border border-gray-300 p-2">NO. TLP</th>
                        <th className="border border-gray-300 p-2">PLAFON</th>
                    </tr>
                </thead>
                <tbody>
                    {pelanggan.map((item) => (
                        <tr key={item.kode} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2 text-center">{item.kode}</td>
                            <td className="border border-gray-300 p-2">{item.nama}</td>
                            <td className="border border-gray-300 p-2">{item.alamat}</td>
                            <td className="border border-gray-300 p-2">{item.kota}</td>
                            <td className="border border-gray-300 p-2">{item.telepon}</td>
                            <td className="border border-gray-300 p-2">{item.plafon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <strong>JUMLAH PELANGGAN: </strong>{pelanggan.length}
            </div>
        </div>
    );
};

export default ListPelanggan;
