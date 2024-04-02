<script lang="ts">
    import Input from '$components/input/Input.svelte';

    export let category: any;

    function revealToken() {
        const cover: HTMLDivElement = document.querySelector(".cover");
        cover.style.opacity = "0";
        setTimeout(() => {
            cover.style.display = "none";
        }, 200)
    }
</script>

<Input label="Token">
    <div class="card input">
        <div class="card cover" on:click={revealToken} on:keydown={revealToken}>
            <p>Click to reveal!</p>
        </div>
        <p>{category.token}</p>
    </div>
</Input>
<div class="warning card">
    <p>DO NOT SHARE WITH SOMEONE YOU DON'T TRUST!</p>
</div>

<style lang="scss">
  .cover {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    backdrop-filter: blur(10px);
    transition: backdrop-filter .3s ease-in-out, opacity .3s ease-in-out;
  }

  .cover:hover {
    backdrop-filter: blur(5px);
  }

  .input {
    padding: 0;
    resize: none;
    color: white;
    width: var(--width, 100%);
    background-color: transparent;
    box-shadow: none;
    border: solid 1px #00000040;

    p {
      padding: 15px;
    }
  }

  .input:focus {
    outline: rgba(0, 0, 0, 0.25) solid;
  }

  .warning {
    p {
      color: red
    }
  }
</style>
