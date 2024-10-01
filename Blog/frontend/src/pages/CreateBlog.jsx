import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import axios from 'axios';
import SessionToken from '../auth/SessionToken.jsx'

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/create-blog", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const {status, data, message} = response.data;
      if (status === 'success') {
        navigate('/home-user');
      } else {
        alert(message || 'An error occurred')
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <SessionToken>
      <div>
        <h1>Create Blog</h1>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px] bg-white">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="title"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Blog Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 font-bold mb-2" htmlFor="content">
                  Blog content
                </label>
                <textarea 
                  onChange={(e) => setContent(e.target.value)} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="content" 
                  rows="5" 
                  placeholder="Write something"
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="image"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Publish Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </SessionToken>
  )
}

export default CreateBlog