<script lang="ts">
	import Modal from '../modal.svelte';
	export let showModal = false;
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
				Wyoming&#39;s <span class="font-bold text-slate-900 px-[1px]">36</span> 13,000-foot peaks
			</li>
			<li>
				Montana&#39;s <span class="font-bold text-slate-900 px-[1px]">27</span> 12,000-foot peaks
			</li>
		</ol>

		<p>
			This hike is to be done entirely on foot. There is no offical trail for this voyage, meaning
			hiking from mountain to mountain will consist not only trails, but also forest, service roads,
			highways, etc. This route in its entirety has not been attempted up to this point, so there
			will be a ton of off-trail and backcountry travel.
		</p>

		<div class="border-b border-b-slate-800 my-4" />

		<p class="font-semibold">
			Follow Jason Heyn as he attempts to complete the first ever Rocky Mountain Slam
		</p>

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
</Modal>
