import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/all-blogs')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          setBlogs(res.data.data);
        } else {
          setError('Data received is not in the expected format');
        }
      })
      .catch(err => {
        console.error('API error:', err);
        setError('An error occurred while fetching data');
      });
  }, []);

  return (
    
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Blogs</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <article key={blog.id} className="overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white">
            <Link to={`/one-blog/${blog._id}`}>
            <img
                alt={blog.title}
                src={blog.image ? `http://localhost:4000${blog.image}` : "default-image-url"}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 sm:p-5">
             

              {/* <Link to={`/one-blog/${blog._id}`} className="block mb-3"></Link> */}
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                  {blog.title}
                </h3>
              
              <p className="text-sm text-gray-600 line-clamp-3">
                {blog.content}
                </p>
                <time dateTime={blog.date} className="block text-xs text-gray-500 mb-2">
                {new Date(blog.date).toString().slice(4,15)}
              </time>
            </div>
            </Link>
          </article>
        ))} 
      </div>
    </div>
  );
}

export default Blogs;