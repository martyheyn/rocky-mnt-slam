<script lang="ts">
	import Modal from '../modal.svelte';
	export let showModal = false;
</script>

<Modal bind:showModal>
	<div class="p-4 text-slate-700">
		<h1 class="text-xl font-semibold">Jason's Attempt at the RMS</h1>
		<div class="border-b border-b-slate-800 my-4" />

		<div class="flex flex-col gap-y-4">
			<p>
				On June 7th, 2023, Jason Heyn took his first steps on a 3-month-long excursion to complete
				the first-ever Rocky Mountain Slam entirely by foot. With no official trail this voyage
				would include bushwhacking, service roads, highways, and a bit (a lot) of unnecessary
				mileage.
			</p>

			<p>
				After completing all of the 14'ers in Colorado and all of the 13'ers in Wyoming, Jason was
				hit by multiple snowstorms while camping in the Beartooth Range in Montana. On September
				25th, he hopped into the first car he had set foot in for 3 months and hitched a ride to the
				nearest town, then checked himself into the hospital to treat his frostbitten feet.
			</p>

			<p>
				You can follow Jason's path here, and check out summit verification videos for each peak
				(mostly).
			</p>
		</div>

		<div class="border-b border-b-slate-800 my-4" />

		<div class="">
			<p class="inline-block mb-1">
				Zoom in on the map and click the <span class="px-[2px] inline-block cursor-pointer">
					<img src="/dot.svg" alt="dot" class="w-4 h-4" />
				</span> icon to track his times
			</p>

			<p class="inline-block my-1">
				Click the <span class="px-[2px] inline-block w-5 h-5">
					<img
						src="/mountain-filled.svg"
						alt="mnt"
						class="w-full h-full object-cover cursor-pointer"
					/>
				</span> icon for more information on each peak and a summit verification video
			</p>
		</div>
	</div>
</Modal>
