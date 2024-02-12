<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import JasonModal from './popups/jason-modal.svelte';

	const showRoute: Writable<boolean> = getContext('showRoute');

	export let label: string;
	export let fontSize = 14;
	export let textColor = 'black';
	export let disabled = true;
	export let info = false;

	let showModal = false;

	const uniqueID = Math.floor(Math.random() * 100);
</script>

<div class="s s--slider w-fit" style="font-size:{fontSize}px">
	{#if label}
		<span
			id={`switch-${uniqueID}`}
			class={`${
				textColor === 'black' ? 'text-black' : 'text-white'
			} bg-slate-700 py-1 px-2 [text-shadow:0_0_10px_#fff] rounded-md h-fit`}>{label}</span
		>
	{/if}
	<div class="w-full flex justify-between items-center px-2">
		<button
			class="s--slider-button"
			role="switch"
			aria-checked={disabled ? true : $showRoute}
			aria-labelledby={`switch-${uniqueID}`}
			on:click={() => showRoute.set(!$showRoute)}
		/>
		{#if info}
			<button
				class="invert hover:scale-[1.04] transition-all duration-300 ease-in-out cursor-pointer"
				on:click={() => (showModal = !showModal)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"
					/></svg
				>
			</button>
		{/if}
	</div>
</div>

<JasonModal bind:showModal />

<style>
	:root {
		--accent-color: CornflowerBlue;
		--gray: #ccc;
	}

	/* Slider Design Option */

	.s--slider {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 4px;
	}

	.s--slider-button {
		width: 3em;
		height: 1.6em;
		position: relative;
		/* margin: 0 0 0 0.5em; */
		background: var(--gray);
		border: none;
	}
	.s--slider-button::before {
		content: '';
		position: absolute;
		width: 1.3em;
		height: 1.3em;
		background: #fff;
		top: 0.13em;
		right: 1.5em;
		transition: transform 0.3s;
	}

	.s--slider-button[aria-checked='true'] {
		background-color: var(--accent-color);
	}

	.s--slider-button[aria-checked='true']::before {
		transform: translateX(1.3em);
		transition: transform 0.3s;
	}

	.s--slider-button:focus {
		box-shadow: 0 0px 0px 1px var(--accent-color);
	}

	/* Multi Design Option */

	/* Based on suggestions from Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/
    and this example from Scott O'hara https://codepen.io/scottohara/pen/zLZwNv */

	/* Slider Design Option */
	.s--slider-button {
		border-radius: 1.5em;
	}

	.s--slider-button::before {
		border-radius: 100%;
	}

	.s--slider-button:focus {
		box-shadow: 0 0px 8px var(--accent-color);
		border-radius: 1.5em;
	}
</style>
