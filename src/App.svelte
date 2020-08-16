<script>
  import books from "./Books/books-store.js";
  import Header from "./UI/Header.svelte";
  import BookGrid from "./Books/BookGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditBook from "./Books/EditBook.svelte";
  import BookDetail from "./Books/BookDetail.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";
  import { onMount } from "svelte";

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error;
  let firebaseUrl = "https://svelte-app-26ef3.firebaseio.com/books.json";

  onMount(() => {
    fetch(firebaseUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetching books failed, please try again later!");
        }
        return res.json();
      })
      .then((data) => {
        const loadedBooks = [];
        for (const key in data) {
          loadedBooks.push({
            ...data[key],
            id: key,
          });
        }
        isLoading = false;
        books.setBooks(loadedBooks.reverse());
      })
      .catch((err) => {
        error = err;
        isLoading = false;
        console.log(err);
      });
  });

  function savedBook(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function clearError() {
    error = null;
  }
</script>

<style>
  main {
    margin-top: 4rem;
  }
</style>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}
<Header />
<main class:detail={page === 'details'}>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditBook id={editedId} on:save={savedBook} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <BookGrid
        books={$books}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = 'edit';
        }} />
    {/if}
  {:else}
    <BookDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
