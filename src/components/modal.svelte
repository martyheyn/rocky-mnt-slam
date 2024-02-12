<script lang="ts">
	import CloseIcon from './icons/close.svelte';
	export let showModal: boolean = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->

<dialog
	class="w-[90vw] md:w-[60vw] h-[78vh] sm:h-[82vh] border-none p-0 backdrop:blur-lg rounded-md overflow-x-hidden no-scrollbar"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="px-1.5 py-2 md:pb-8 md:px-8 md:py-8 w-full h-full">
		<!-- svelte-ignore a11y-autofocus -->
		<button
			class=" absolute top-2.5 right-2.5 fill-slate-800 hover:fill-slate-600 hover:scale-[1.04] transition-all duration-1500 ease-linear"
			autofocus
			on:click={() => dialog.close()}
		>
			<!-- <img src="/close.svg" alt="close svg" /> -->
			<CloseIcon />
		</button>
		<slot />
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.4s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
