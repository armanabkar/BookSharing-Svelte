import { writable } from "svelte/store";

const books = writable([]);

//This is just for test
/* 
const books = writable([
  {
    title: "Biology",
    isFavorite: false,
    imageUrl: "https://miro.medium.com/max/3340/0*jmrpnXe-djmTh37l.",
    description: "This is an awesome book.",
    contactPhone: "09363868196",
  },
]);
*/

const customBooksStore = {
  subscribe: books.subscribe,
  setBooks: (bookArray) => {
    books.set(bookArray);
  },
  addBook: (bookData) => {
    const newBook = {
      ...bookData,
    };
    books.update((items) => {
      return [newBook, ...items];
    });
  },
  updatedBook: (id, bookData) => {
    books.update((items) => {
      const bookIndex = items.findIndex((i) => i.id === id);
      const updatedBook = { ...items[bookIndex], ...bookData };
      const updatedBooks = [...items];
      updatedBooks[bookIndex] = updatedBook;
      return updatedBooks;
    });
  },
  removeBook: (id) => {
    books.update((items) => {
      return items.filter((i) => i.id !== id);
    });
  },
  toggleBorrow: (id) => {
    books.update((items) => {
      const updatedBook = { ...items.find((m) => m.id === id) };
      updatedBook.isBorrowed = !updatedBook.isBorrowed;
      const bookIndex = items.findIndex((m) => m.id === id);
      const updatedBooks = [...items];
      updatedBooks[bookIndex] = updatedBook;
      return updatedBooks;
    });
  },
};

export default customBooksStore;
