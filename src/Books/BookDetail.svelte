<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import books from "./books-store.js";
  import Button from "../UI/Button.svelte";

  export let id;

  let selectedBook;

  const unsubscribe = books.subscribe((items) => {
    selectedBook = items.find((i) => i.id === id);
  });

  const dispatch = createEventDispatcher();

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  section {
    margin-top: 4rem;
  }

  .image {
    width: 100%;
    height: 25rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image {
    background: #e7e7e7;
  }

  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }

  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }

  p {
    font-size: 1.5rem;
  }
</style>

<section>
  <div class="image">
    <img src={selectedBook.imageUrl} alt={selectedBook.title} />
  </div>
  <div class="content">
    <h1>{selectedBook.title}</h1>
    <h2>{selectedBook.contactPhone}</h2>
    <p>{selectedBook.description}</p>
    <Button href="tel:{selectedBook.contactPhone}">Contact</Button>
    <Button type="button" mode="outline" on:click={() => dispatch('close')}>
      Close
    </Button>
  </div>
</section>
