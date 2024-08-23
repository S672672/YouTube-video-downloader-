import React, { useState } from 'react';
import axios from 'axios';
import { FaYoutube } from 'react-icons/fa';

function App() {
    const [url, setUrl] = useState('');
    const [quality, setQuality] = useState('highest');
    const [message, setMessage] = useState('');

    const handleDownload = async () => {
        try {
            const response = await axios.post('http://localhost:5000/download', { url, quality });
            setMessage(response.data);
        } catch (error) {
            setMessage('Error downloading video');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white">
            <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                    <FaYoutube className="text-5xl mx-auto mb-4 text-red-500 animate-pulse" />
                    <h1 className="text-4xl font-extrabold text-white tracking-wide">
                        YouTube Downloader
                    </h1>
                </div>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste YouTube URL"
                        className="w-full p-3 bg-white bg-opacity-20 rounded-lg text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
                    />
                    <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full p-3 bg-white bg-opacity-20 rounded-lg text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
                    >
                        <option value="highest" className='font-bold text-gray-700'>Highest Quality</option>
                        <option value="1080p" className='text-black'>1080p</option>
                        <option value="720p" className='text-black'>720p</option>
                        <option value="480p" className='text-black'>480p</option>
                        <option value="360p" className='text-black'>360p</option>
                    </select>
                    <button
                        onClick={handleDownload}
                        className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:from-pink-500 hover:to-yellow-500 transform transition-all duration-300"
                    >
                        Download Video
                    </button>
                    {message && (
                        <p className="mt-4 text-center text-sm text-gray-200">{message}</p>
                    )}
                </div>
                <div className="absolute top-0 left-0 w-full h-full border border-white border-opacity-20 rounded-3xl pointer-events-none animate-pulse" />
            </div>
        </div>
    );
}

export default App;
