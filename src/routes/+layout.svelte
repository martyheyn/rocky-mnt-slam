<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	// Inject the Analytics functionality
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Rocky Mountain Slam</title>
</svelte:head>

<div class="">
	<slot />
</div>
