import React, { useState } from 'react';

const UploadResource = () => {
  const [type, setType] = useState('video');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFile(null);
    setLink('');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Upload Course / Resource</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 max-w-xl mx-auto flex flex-col gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="link">Class Link</option>
          </select>
        </div>
        {type === 'video' && (
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={type === 'video'}
            />
          </div>
        )}
        {type === 'pdf' && (
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required={type === 'pdf'}
            />
          </div>
        )}
        {type === 'link' && (
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Class Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="https://..."
              required={type === 'link'}
            />
          </div>
        )}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. math, algebra, class 10"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
        {success && (
          <div className="text-green-600 font-semibold text-center mt-2">Resource uploaded successfully!</div>
        )}
      </form>
    </div>
  );
};

export default UploadResource; 