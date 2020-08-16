<script>
  import books from "./books-store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty } from "../helpers/validation.js";

  export let id = null;

  let title = "";
  let phone = "";
  let description = "";
  let imageUrl = "";

  if (id) {
    const unsubscribe = books.subscribe((items) => {
      const selectedBook = items.find((i) => i.id === id);
      title = selectedBook.title;
      phone = selectedBook.contactPhone;
      description = selectedBook.description;
      imageUrl = selectedBook.imageUrl;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: phoneValid = !isEmpty(phone);
  $: formIsValid =
    titleValid && descriptionValid && imageUrlValid && phoneValid;

  function submitForm() {
    const bookData = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      contactPhone: phone,
    };
    if (id) {
      fetch(`https://svelte-app-26ef3.firebaseio.com/books/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(bookData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          books.updateBook(id, bookData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("https://svelte-app-26ef3.firebaseio.com/books.json", {
        method: "POST",
        body: JSON.stringify({ ...bookData, isBarrowed: false }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          return res.json();
        })
        .then((data) => {
          books.addBook({
            ...bookData,
            isBarrowed: false,
            id: data.name,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    dispatch("save");
  }

  function deleteBook() {
    fetch(`https://svelte-app-26ef3.firebaseio.com/books/${id}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        books.removeBook(id);
      })
      .catch((err) => console.log(err));
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }

  a {
    font-size: 14px;
  }
</style>

<Modal title="Edit Book Data" on:cancel>
  <form on:submit={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={(event) => (title = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image url."
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)} />
    <TextInput
      id="phone"
      label="Telephone Number"
      type="tel"
      valid={phoneValid}
      validityMessage="Please enter a valid phone numebr."
      value={phone}
      on:input={(event) => (phone = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      bind:value={description} />
  </form>
  <a href="http://8upload.ir/" target="_blank">
    You can upload your image here.
  </a>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteBook}>Delete</Button>
    {/if}
  </div>
</Modal>
