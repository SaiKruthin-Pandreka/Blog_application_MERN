import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ViewBlog() {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/one-blog/${id}`)
      .then(res => {
        if (res.data && res.data.data) {
          setBlog(res.data.data);
        } else {
          setError('Data received is not in the expected format');
        }
      })
      .catch(err => {
        console.error('API error:', err);
        setError('An error occurred while fetching the blog');
      });
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
            <a
  className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
  href="#"
>
  <span className="absolute inset-0 border border-current"></span>
        <span
          onClick={() => navigate(-1)}
    className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
  >
    Back
  </span>
</a>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img 
        src={blog.image ? `http://localhost:4000${blog.image}` : "default-image-url"}
        alt={blog.title} 
        className="w-full h-64 object-cover mb-4"
      />
      <time dateTime={blog.date} className="block text-sm text-gray-500 mb-4">
        {new Date(blog.date).toString().slice(4,15)}
      </time>
      <h1 className='text-xl bold underline'>{blog.description}</h1>
      <div className="prose max-w-none">
        {blog.content}
      </div>
      <p className='text-xl text-red-600 '>Author: {blog.author}</p>
    </div>
  );
}

export default ViewBlog;