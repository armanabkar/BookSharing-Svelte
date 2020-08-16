<script>
  import { createEventDispatcher } from "svelte";
  import books from "./books-store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  export let id;
  export let title;
  export let imageUrl;
  export let description;
  export let isBow;
  export let phone;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  function toggleBorrow() {
    isLoading = true;
    fetch(`https://svelte-app-26ef3.firebaseio.com/books/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isBorrowed: !isBow }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        isLoading = false;
        books.toggleBorrow(id);
      })
      .catch((err) => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  footer {
    padding-top: 0;
  }

  .image {
    width: 100%;
    height: 13rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
      {title}
      {#if isBow}
        <Badge>BORROWED</Badge>
      {/if}
    </h1>
    <p>{phone}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" type="button" on:click={() => dispatch('edit', id)}>
      Edit
    </Button>
    {#if isLoading}
      <Button
        mode="outline"
        color={isBow ? null : 'success'}
        type="button"
        on:click={toggleBorrow}
        disabled>
        {isBow ? 'Return' : 'Borrow'}
      </Button>
    {:else}
      <Button
        mode="outline"
        color={isBow ? null : 'success'}
        type="button"
        on:click={toggleBorrow}>
        {isBow ? 'Return' : 'Borrow'}
      </Button>
    {/if}
    <Button type="button" on:click={() => dispatch('showdetails', id)}>
      Show Details
    </Button>
  </footer>
</article>
