import axios from 'axios'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


type Book = {
  id: number,
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number
}

const defaultBooks: Book[] = [
  {
    "id": 1,
    "author": "Chinua Achebe",
    "country": "Nigeria",
    "imageLink": "images/things-fall-apart.jpg",
    "language": "English",
    "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
    "pages": 209,
    "title": "Things Fall Apart",
    "year": 1958
  },
  {
    "id": 2,
    "author": "Hans Christian Andersen",
    "country": "Denmark",
    "imageLink": "images/fairy-tales.jpg",
    "language": "Danish",
    "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
    "pages": 784,
    "title": "Fairy tales",
    "year": 1836
  }]

function App() {
  const [books, setBooks] = useState<Book[]>(defaultBooks)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const apiUrl = 'http://10.25.31.106:5000/';
    axios
      .get(apiUrl)
      .then((response) => {
        setBooks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="#" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Book Store</h1>
      <section>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            books.map((book) => (
              <div key={book.id} className='book-container'>
                <h3>{book.id + '. ' +book.title}</h3>
                <p>Written by {book.author}</p>
                <p>Published in {book.year}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}

export default App
