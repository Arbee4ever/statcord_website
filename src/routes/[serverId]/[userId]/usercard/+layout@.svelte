<slot></slot>

<style>
	:global(*) {
		font-family: 'Josefin Sans', sans-serif;
		margin: 0%;
		scrollbar-width: auto;
		scrollbar-color: rgba(127, 127, 127, 0.502) #000000;
	}

	:global(*)::-webkit-scrollbar {
		width: 12px;
	}

	:global(*)::-webkit-scrollbar-thumb {
		background-color: #00000080;
		border-radius: 10px;
		border: 0px;
	}

	:global(body) {
		--scroll-behavior: smooth;
		scroll-behavior: smooth;
		overflow: overlay;
		overflow-x: hidden;
		background: linear-gradient(to bottom right, #2b8eaf, #b222a8);
		background-attachment: fixed;
	}

	:global(h1, h2, h3, a, p) {
		color: White;
		text-decoration: none;
	}

	:global(main) {
		min-height: 50vh;
	}

	:global(.hide) {
		opacity: 0;
	}
</style>
