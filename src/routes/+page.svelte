<script lang="ts">
	import Lakes from '$lib/components/lakes.svelte';
	import Rivers from '$lib/components/rivers.svelte';
	import AdminBorders from '$lib/components/administrative-borders.svelte';
	import Republics from '$lib/components/republics.svelte';
	import ForeignBorders from '$lib/components/foreign-borders.svelte';
	import ForeignTerritory from '$lib/components/foreign-territory.svelte';
	import Claims from '$lib/components/claims.svelte';
	import Popup from '$lib/components/popup.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Defs from '$lib/components/defs.svelte';
	import mapState from '$lib/state.svelte';
	import '../globals.css';

	let leftMargin = $state<number | null>(null);
</script>

<svg style:margin-left={leftMargin} viewBox="283 178 1100 600">
	<Defs />
	<ForeignTerritory />
	<Republics />
	{#if mapState.nationalBorders}
		<ForeignBorders />
	{/if}
	{#if mapState.showAdministrativeBorders}
		<AdminBorders />
	{/if}
	<Claims />
	<Rivers />
	<Lakes />
</svg>

<Popup />

<Sidebar toggleSidebar={(newState) => leftMargin = newState ? null : 0} />

<style>
	svg {
		height: 100dvh;
		margin-left: max(var(--sidebar-width), 10%);
		display: block;
	}

	@media (max-width: 1023px) {
		svg {
			margin-left: 0;
		}
	}
</style>
