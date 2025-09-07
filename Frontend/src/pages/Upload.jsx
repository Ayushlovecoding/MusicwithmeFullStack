import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ No file selected!");
      return;
    }

    // ✅ Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must be logged in to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "musicme_uploads");

    try {
      // ✅ Upload to Cloudinary
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtqrhixdz/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token
          },
        }
      );

      setUrl(res.data.secure_url);
      setMessage("✅ Upload successful!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 text-white px-4">
      <h2 className="text-3xl font-semibold mb-6">Upload File</h2>

      {/* Custom file upload box */}
      <label className="w-full max-w-md bg-gray-800 border-2 border-dashed border-purple-500 rounded-lg px-6 py-10 text-center cursor-pointer transition hover:bg-gray-700 mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        {file ? (
          <span className="text-lg">{file.name}</span>
        ) : (
          <span className="text-lg flex flex-col items-center">
            No file chosen
            <span className="text-2xl mt-2 animate-bounce">↓</span>
          </span>
        )}
      </label>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow-md transition"
      >
        Upload
      </button>

      {/* Status message */}
      {message && <p className="mt-4">{message}</p>}

      {/* Uploaded URL */}
      {url && (
        <div className="mt-6 text-center">
          <p className="mb-2">Uploaded File:</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline break-all"
          >
            {url}
          </a>
        </div>
      )}
    </div>
  );
};

export default Upload;
