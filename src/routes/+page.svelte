<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	// leaflet imports
	import { browser } from '$app/environment';
	import { mountainPeaks } from '../utils/mountains';
	import { jasonTracks } from '../utils/jason-coords';
	import type { Icon, LatLngExpression, Marker, Polyline, divIcon } from 'leaflet';
	import { convertToStandardTime } from '../utils/time';

	import MntPopup from '../components/popups/mnt-popup.svelte';
	import InfoModal from '../components/popups/info-modal.svelte';
	import Switch from '../components/switch.svelte';

	let showMntCounter = false;

	let windowWidth: number;

	let showModal = false;

	const showRoute: Writable<boolean> = getContext('showRoute');

	// get current date
	const lastUpdated = 'Sept 25 2023, 09:07 (EST)';

	// array for markers so I can remove and replace them
	let markers: { marker: Marker<any>; type: string }[] = [];
	let polyline: Polyline<any>;

	// function to create mountain marker

	type mntData = {
		name: string;
		gain: number;
		elevation: number;
		location: {
			lat: number;
			lng: number;
		};
		link: string;
		img: string;
		vid: string;
	}[];

	// TODO: show video on intial click, not on exit
	const placeMntMarker = async (
		mnts: mntData,
		icon: Icon<{
			iconUrl: string;
			iconSize: [number, number];
		}>
	) => {
		const leaflet = await import('leaflet');

		mnts.map((peak) => {
			let marker = leaflet
				.marker([peak.location.lat, peak.location.lng], {
					opacity: 1,
					icon: icon,
					riseOnHover: true
				})

				.addTo(map)
				.bindPopup('');

			markers.push({ marker, type: 'mnt' });

			// need to render this component as HTML to pass to the popup
			// Create a new instance of the Child component
			marker.on('click', function (e) {
				// Create a container div for your Svelte component
				const container = document.createElement('div');

				// Instantiate the Svelte component inside the container
				new MntPopup({
					target: container,
					props: {
						peakName: peak.name,
						peakElevation: peak.elevation,
						peakHieght: peak.gain,
						link: peak.link,
						img: peak.img,
						video: peak.vid,
						showRoute: $showRoute
					}
				});

				const popup = leaflet.popup({
					className: `mnt-popup ${!peak.img ? 'no-img' : ''}`
				});

				popup.setContent(container);

				marker.bindPopup(popup).openPopup();
			});
		});
	};

	// TODO'S
	// cleanup code
	// optimatize pictures to load faster
	// add tooltip with multiple terrian types
	// easter egg for pictures
	// cluster mountain peaks

	let mapElement: any;
	let map: any;

	const jasonlatLngs: LatLngExpression[] = jasonTracks.map((track) => [track.lat, track.lng]);

	const trackPopup = (day: string, time: string) =>
		`<div class="flex flex-col items-start gap-1 px-5 py-2 mt-2 w-full min-w-[130px]">
			<div class="text-[15px] text-slate-700 font-semibold"> ${day}</div>
			<div class="flex items-center gap-x-2">
				<img src="footprint.svg" alt="" class="object-fill w-5 h-6 bg-[#3388ff]" />
				<div class="text-sm text-slate-500 font-extralight mt-.5"> ${time}</div>
			</div>
		</div>`;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet
				.map(mapElement, {
					scrollWheelZoom: false,
					zoomControl: false
				})
				.setView([41.044811, -107.27215], 6)
				.setMaxZoom(14);

			leaflet
				.tileLayer(
					'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
					{
						attribution:
							'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
						maxZoom: 16
					}
				)
				.addTo(map);

			// tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			// attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			// });

			const mntMarker = new leaflet.Icon({
				iconUrl: '/mountain-filled.svg',
				iconSize: [24, 24]
			});

			placeMntMarker(mountainPeaks.colorado, mntMarker);
			placeMntMarker(mountainPeaks.wyoming, mntMarker);
			placeMntMarker(mountainPeaks.montana, mntMarker);

			// hide dot markers and popup unless zoomed in, keep mountains visible
			map.on('zoomend', function () {
				if (map.getZoom() < 8) {
					// how can I hide dot markers but not mountains?
					map.eachLayer(function (layer: { setOpacity: (arg0: number) => void }) {
						if (layer instanceof leaflet.Marker) {
							if (layer.options.icon && layer.options.icon.options.iconUrl === '/dot.svg') {
								layer.setOpacity(0);
								layer.on('click', function () {
									layer.closePopup();
								});
							}

							if (
								layer.options.icon &&
								layer.options.icon.options.iconUrl === '/mountain-filled.svg'
							) {
								const bigMarker = layer.options.icon;
								bigMarker.options.iconSize = [24, 24];
								layer.setIcon(bigMarker);
							}
						}
					});
				} else {
					map.eachLayer(function (layer: { setOpacity: (arg0: number) => void }) {
						if (layer instanceof leaflet.Marker) {
							layer.setOpacity(1);
							layer.on('click', function () {
								layer.openPopup();
							});

							if (
								layer.options.icon &&
								layer.options.icon.options.iconUrl === '/mountain-filled.svg'
							) {
								const smallMarker = layer.options.icon;
								smallMarker.options.iconSize = [36, 36];
								layer.setIcon(smallMarker);
							}
						}
					});
				}

				if (map.getZoom() > 11) {
					map.eachLayer(function (layer: { setOpacity: (arg0: number) => void }) {
						if (layer instanceof leaflet.Marker) {
							if (layer.options.icon && layer.options.icon.options.iconUrl === '/dot.svg') {
								const smallMarker = layer.options.icon;
								smallMarker.options.iconSize = [12, 12];
								layer.setIcon(smallMarker);
							}
						}
					});
				} else {
					map.eachLayer(function (layer: { setOpacity: (arg0: number) => void }) {
						if (layer instanceof leaflet.Marker) {
							if (layer.options.icon && layer.options.icon.options.iconUrl === '/dot.svg') {
								const smallMarker = layer.options.icon;
								smallMarker.options.iconSize = [8, 8];
								layer.setIcon(smallMarker);
							}
						}
					});
				}
			});
		}
	});

	const addTracks = async () => {
		const leaflet = await import('leaflet');

		const dotMarker = new leaflet.Icon({
			iconUrl: '/dot.svg',
			iconSize: [8, 8]
		});

		jasonTracks.map((track) => {
			let day = track.time.split(' ')[0];
			// convert yyyy/mm/dd to dd/mm/yyyy
			day = day.split('/')[1] + '/' + day.split('/')[2] + '/' + day.split('/')[0];

			let time = track.time.split(' ')[1].slice(0, -3);
			// convert military time to standard time
			time = convertToStandardTime(time);

			// create marker with initailly closed popup
			let marker = leaflet
				.marker([track.lat, track.lng], { opacity: 0, icon: dotMarker })
				.addTo(map);

			markers.push({ marker, type: 'track' });

			let popup = leaflet
				.popup({
					className: 'dot-popup'
				})
				.setContent(trackPopup(day, time));

			marker.bindPopup(popup).on('click', function () {
				marker.closePopup();
			});
		});

		// jasons markers here, with a polyline and animation
		polyline = leaflet.polyline(jasonlatLngs, { className: 'tracks-line' }).addTo(map);

		// on allow scrolling once animation finishes
		setTimeout(() => {
			map.scrollWheelZoom.enable();
			map.zoomControl = true;
			showMntCounter = true;
		}, 4000);
	};

	const removeTracks = () => {
		markers.map((marker) => {
			if (marker.type === 'track') {
				marker.marker.remove();
			}
		});
		// polyline.remove();
		if (map && polyline) {
			map.removeLayer(polyline);
		}
	};

	// add and remove track markers
	$: $showRoute && addTracks();
	$: !$showRoute && removeTracks();

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}
</script>

<svelte:window on:resize={resizeMap} bind:innerWidth={windowWidth} />

<main class="relative">
	<div class="h-screen tracks-line" bind:this={mapElement} />
	<button
		class="absolute top-4 left-[24px] z-[400] bg-slate-700 shadow-[2.5px_3px_2.5px_rgba(0,0,0,0.2),7.5px_7.5px_5px_rgba(0,0,0,0.5)] rounded-md w-12 h-12 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
		on:click={() => (showModal = true)}
	>
		<img src="/mountain-filled.svg" class="p-1.5" alt="mnt" />
	</button>

	<div
		class={`absolute top-5 right-6 transition-all ease-in-out duration-300 z-[999] bg-slate-700 shadow-[2.5px_3px_2.5px_rgba(0,0,0,0.2),7.5px_7.5px_5px_rgba(0,0,0,0.5)] rounded-md h-[72px] px-3 flex items-center`}
	>
		<Switch label="Show Jasons Journey" textColor="white" disabled={false} info={true} />
	</div>

	<div class="absolute bottom-0 right-0 z-[400] bg-white">
		<p class="text-xs text-slate-400 px-1 py-[1.5px]">
			Last updated: {lastUpdated} | Maps by Leafet
		</p>
	</div>
</main>

<InfoModal bind:showModal />

<style>
	@import 'leaflet/dist/leaflet.css';

	.tracks-line {
		stroke-dasharray: 1920;
		stroke-dashoffset: 1920;
		animation: dash 5s linear 1.5s forwards;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
