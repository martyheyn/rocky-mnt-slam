<script lang="ts">
	import { slide } from 'svelte/transition';
	import Modal from '../modal.svelte';
	import Switch from '../switch.svelte';
	export let showModal = false;

	let additionalInfo = false;
	let sliderValue = false;
</script>

<Modal bind:showModal>
	<div class="p-4 text-slate-700">
		<h1 class="text-xl font-semibold">Rocky Mountain Slam</h1>
		<div class="border-b border-b-slate-800 my-4" />

		<p>The Rocky Mountain Slam consists of summiting:</p>

		<ol class="my-3 pl-2 font-semibold gap-y-1 text-slate-600">
			<li>
				Colorado&#39;s <span class="font-bold text-slate-900 px-[1px]">58</span> 14,000-foot peaks
			</li>
			<li>
				Wyoming&#39;s <span class="font-bold text-slate-900 px-[1px]">37</span> 13,000-foot peaks
			</li>
			<li>
				Montana&#39;s <span class="font-bold text-slate-900 px-[1px]">27</span> 12,000-foot peaks
			</li>
		</ol>

		<p>
			This hike is to be done entirely on foot. There is no offical trail for this voyage, meaning
			hiking from mountain to mountain will consist not only of trails, but also forest, service
			roads, highways, etc. This route in its entirety has not been attempted up to this point, so
			there will be a ton of off-trail and backcountry travel.
		</p>

		<div class="border-b border-b-slate-800 my-4" />

		<div class="flex justify-end items-center pr-2">
			<button
				class={`${
					additionalInfo ? 'rotate-1' : 'rotate-180'
				} transition-all ease-in-out duration-300 cursor-pointer`}
				on:click={() => (additionalInfo = !additionalInfo)}
			>
				<svg
					clip-rule="evenodd"
					fill-rule="evenodd"
					stroke-linejoin="round"
					stroke-miterlimit="2"
					viewBox="0 0 24 24"
					class="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"
					/></svg
				></button
			>
		</div>

		{#if additionalInfo}
			<div transition:slide={{ duration: 300 }}>
				<p class="font-semibold block">
					To see Jason Heyn's attempt at the Rocky Mountain Slam click this
					<span class="inline-block px-1">
						<Switch label="" fontSize={12} />
					</span>
					switch
				</p>

				<div class="pl-3">
					<p class="inline-block mt-4 mb-1">
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
		{/if}
	</div>
</Modal>
