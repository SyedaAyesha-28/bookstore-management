"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("token");

  const getBooks = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/books/all",
      {
        headers: { Authorization: "Bearer " + token }
      }
    );
    setBooks(response.data);
  };

  const addBook = async () => {

    await axios.post(
      "http://localhost:8080/api/books/add",
      { title, author, price },
      { headers: { Authorization: "Bearer " + token } }
    );

    setTitle("");
    setAuthor("");
    setPrice("");

    getBooks();
  };

  const deleteBook = async (id) => {

    await axios.delete(
      "http://localhost:8080/api/books/delete/" + id,
      { headers: { Authorization: "Bearer " + token } }
    );

    getBooks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      getBooks();
    }

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-10">

      {/* NAVBAR */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          📚 Bookstore Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition"
        >
          Logout
        </button>

      </div>


      {/* ADD BOOK CARD */}

      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl mb-12 max-w-xl">

        <h2 className="text-2xl font-semibold text-white mb-5">
          Add Book
        </h2>

        <input
          value={title}
          placeholder="Title"
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border-none outline-none"
        />

        <input
          value={author}
          placeholder="Author"
          onChange={(e)=>setAuthor(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border-none outline-none"
        />

        <input
          value={price}
          placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl border-none outline-none"
        />

        <button
          onClick={addBook}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          Add Book
        </button>

      </div>


      {/* BOOK GRID */}

      <h2 className="text-3xl text-white font-bold mb-6">
        Available Books
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book.id}
            className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >

            <h3 className="text-xl font-bold text-white mb-2">
              {book.title}
            </h3>

            <p className="text-white">
              Author: {book.author}
            </p>

            <p className="text-white font-semibold mt-2">
              ₹{book.price}
            </p>

            <button
              onClick={() => deleteBook(book.id)}
              className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}