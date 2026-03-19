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
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    setBooks(response.data);
  };

  const addBook = async () => {

    await axios.post(
      "http://localhost:8080/api/books/add",
      { title, author, price },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    setTitle("");
    setAuthor("");
    setPrice("");

    getBooks();
  };

  const deleteBook = async (id) => {

    await axios.delete(
      "http://localhost:8080/api/books/delete/" + id,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
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

    <div className="min-h-screen bg-gray-100 p-10">

      {/* NAVBAR */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-3xl font-bold">
          📚 Bookstore Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>


      {/* ADD BOOK FORM */}

      <div className="bg-white p-6 rounded shadow mb-10 w-full max-w-xl">

        <h2 className="text-xl font-semibold mb-4">
          Add Book
        </h2>

        <input
          value={title}
          placeholder="Title"
          onChange={(e)=>setTitle(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          value={author}
          placeholder="Author"
          onChange={(e)=>setAuthor(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          value={price}
          placeholder="Price"
          onChange={(e)=>setPrice(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={addBook}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>

      </div>


      {/* BOOK GRID */}

      <h2 className="text-2xl font-bold mb-4">
        Available Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {books.map((book) => (

          <div
            key={book.id}
            className="bg-white p-5 rounded shadow"
          >

            <h3 className="text-lg font-bold mb-2">
              {book.title}
            </h3>

            <p className="text-gray-600">
              Author: {book.author}
            </p>

            <p className="font-semibold mt-2">
              ₹{book.price}
            </p>

            <button
              onClick={() => deleteBook(book.id)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}