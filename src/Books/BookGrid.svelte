<script>
  import { createEventDispatcher } from "svelte";
  import BookItem from "./BookItem.svelte";
  import BookFilter from "./BookFilter.svelte";
  import Button from "../UI/Button.svelte";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";

  export let books;

  const dispatch = createEventDispatcher();

  let availableOnly = false;

  $: filteredBooks = availableOnly ? books.filter((m) => !m.isBorrowed) : books;

  function setFilter(event) {
    availableOnly = event.detail === 1;
  }
</script>

<style>
  #books {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #book-controls {
    margin: 0 1rem 0.1rem 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #books {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  h1 {
    margin-left: 1rem;
    color: rgb(141, 141, 141);
  }
</style>

<section id="book-controls">
  <BookFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Book</Button>
</section>
<section id="books">
  {#each filteredBooks as book (book.id)}
    <div transition:slide animate:flip={{ duration: 300 }}>
      <BookItem
        id={book.id}
        title={book.title}
        description={book.description}
        imageUrl={book.imageUrl}
        phone={book.contactPhone}
        isBow={book.isBorrowed}
        on:showdetails
        on:edit />
    </div>
  {:else}
    <h1>There is nothing to show.</h1>
  {/each}
</section>
