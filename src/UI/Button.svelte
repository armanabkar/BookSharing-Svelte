<script>
  export let type = "button";
  export let href = null;
  export let mode = null;
  export let color = null;
  export let disabled = false;
</script>

<style>
  button,
  a {
    font: inherit;
    border: 1px solid #607d8b;
    background: #607d8b;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px #000.26;
    cursor: pointer;
    text-decoration: none;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active,
  a:hover,
  a:active {
    background: #34444b;
    border-color: #34444b;
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: #ccc;
    border-color: #ccc;
    color: #959595;
    box-shadow: none;
    cursor: not-allowed;
  }

  .success {
    background: #00AA8D;
    border-color: #00AA8D;
  }

  .success:hover,
  .success:active {
    background: #00BF9A;
    border-color: #00BF9A;
  }

  .outline {
    background: transparent;
    color: #607d8b;
    box-shadow: none;
  }

  .outline:hover,
  .outline:active {
    background: inherit;
    box-shadow: none;
    background-color: rgb(238, 238, 238);
  }

  .outline:disabled,
  .outline:disabled:hover,
  .outline:disabled:active {
    background: transparent;
    color: #ccc;
  }

  .outline.success {
    border-color: #00AA8D;
    color: #00AA8D;
  }

  .outline.success:hover,
  .outline.success:active {
    background: #c2ffd1;
  }
</style>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{mode} {color}" {type} on:click {disabled}>
    <slot />
  </button>
{/if}
