<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import Modal from '../modal.svelte';

	export let peakName: string = '';
	export let peakHieght: number = 0;
	export let peakElevation: number = 0;
	export let link: string = '';
	export let img: string;
	export let video: string;

	let showModal = false;
	let videoPlayer: HTMLVideoElement;
	let controls = false;
	let showVideoPlayerBtn = true;

	const playVideo = () => {
		videoPlayer.play();
		controls = true;
		showVideoPlayerBtn = false;
	};

	$: if (!showModal) {
		if (videoPlayer) {
			videoPlayer.pause();
		}
	}

	// TODO: do not blur while playing video
</script>

<div class="flex flex-col h-[195px]">
	<div class="w-full min-w-[180px]">
		{#if video}
			<Splide aria-label="mnt-peak">
				<SplideSlide>
					<img
						src={img || 'mountain-filled.svg'}
						alt=""
						class="object-fill rounded-xl w-full h-full max-h-[145px] min-h-[140px] p-1"
					/>
				</SplideSlide>
				<SplideSlide>
					<video
						class="object-cover rounded-xl w-full h-full max-h-[145px] min-h-[144px] p-1 blur-[.5px]"
						preload="metadata"
					>
						<source src={video} type="video/mp4" />
						<track kind="captions" />
					</video>
					<div class="w-full h-full relative">
						<button
							class="absolute -top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
							on:click={() => (showModal = true)}
						>
							<img
								src="/play-button.png"
								alt="Play Button"
								class="w-16 h-16 bg-slate-100 hover:bg-slate-50 transition-all ease-out duration-300 rounded-full cursor-pointer bg-opacity-50 hover:bg-opacity-75"
							/>
						</button>
					</div>
				</SplideSlide>
			</Splide>
		{:else}
			<img
				src={img || 'mountain-filled.svg'}
				alt=""
				class="object-fill rounded-xl w-full h-full max-h-[145px] min-h-[144px] p-1"
			/>
		{/if}
	</div>
	<div class=" px-4 pt-1 pb-2">
		<a
			href={link}
			target="_blank"
			class="{link
				? 'cursor-pointer hover:underline'
				: 'pointer-events-none'} text-[16px] transition-all ease-out duration-300"
		>
			<h1 class="text-md font-bold">{peakName}</h1>
		</a>

		<div class="flex gap-2 justify-start mt-[1px]">
			<div class="text-xs font-gray-400 font-semibold">
				{peakElevation.toLocaleString('en-US')} ft
			</div>
			<div>|</div>
			<div class="text-xs font-gray-400 font-semibold">
				{peakHieght.toLocaleString('en-US')} ft gain
			</div>
		</div>
	</div>
</div>

<Modal bind:showModal>
	<div class={`relative w-full h-full`}>
		<video
			class={`object-cover rounded-xl w-full h-full transition-all ease-out duration-500`}
			bind:this={videoPlayer}
			{controls}
		>
			<source src={video} type="video/mp4" />
			<track kind="captions" />
		</video>

		{#if showVideoPlayerBtn}
			<button
				class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
				on:click={playVideo}
			>
				<img
					src="/play-button.png"
					alt="Play Button"
					class="w-24 h-24 bg-slate-100 hover:bg-slate-50 transition-all ease-out duration-300 rounded-full cursor-pointer bg-opacity-50 hover:bg-opacity-75"
				/>
			</button>
		{/if}
	</div>
</Modal>
