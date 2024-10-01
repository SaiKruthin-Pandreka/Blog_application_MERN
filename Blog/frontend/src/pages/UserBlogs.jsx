import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode'

function UserBlogs() {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const tk = sessionStorage.getItem('token')
    const decodedUser = jwt_decode.jwtDecode(tk)
    
    axios.get('http://localhost:4000/api/all-blogs')
      .then(res => {
        if (res.data && Array.isArray(res.data.data)) {
          const userBlogs = res.data.data.filter(blog => blog.author === decodedUser.id)
          setBlogs(userBlogs)
        } else {
          setError('Data received is not in the expected format')
        }
      })
      .catch(err => {
        console.error('API error:', err)
        setError('An error occurred while fetching data')
      })
  }, [])

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-8">Your Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <article key={blog._id} className="overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white">
            <Link to={`/one-blog/${blog._id}`}>
              <img
                alt={blog.title}
                src={blog.image || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 sm:p-5">
                <time dateTime={blog.date} className="block text-xs text-gray-500 mb-2">
                  {new Date(blog.date).toLocaleDateString()}
                </time>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.content}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default UserBlogs