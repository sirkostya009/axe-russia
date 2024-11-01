<script>
	import Lakes from '../components/lakes.svelte';
	import Rivers from '../components/rivers.svelte';
	import AdminBorders from '../components/administrative-borders.svelte';
	import Republics from '../components/republics.svelte';
	import ForeignBorders from '../components/foreign-borders.svelte';
	import ForeignTerritory from '../components/foreign-territory.svelte';
	import Claims from '../components/claims.svelte';
	import Popup from '../components/popup.svelte';
	import Sidebar from '../components/sidebar.svelte';
	import { mapState } from '$lib/client/state.svelte';

	const { data } = $props();
	const { i18n, locale, isMobile, isNoticeAcknowledged } = data;

	$effect(() => {
		document.body.classList.remove('dark-theme', 'light-theme');
		if (mapState.theme === 'dark') document.body.classList.add('dark-theme');
		else if (mapState.theme === 'light') document.body.classList.add('light-theme');
	});
</script>

<svg viewBox="283 276 1100 600">
	<defs>
		<pattern patternUnits="objectBoundingBox" id="liberal-russian-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/6/6f/White-blue-white_flag.svg"
				width="1200"
				height="360"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="komi-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/3/38/Komi_Nordic_cross_flag.svg"
				width="165"
				height="125"
				y="-10"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="khakassia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Khakassia.svg"
				width="160"
				height="60"
				x="-20"
			></image>
		</pattern>
		<pattern patternUnits="userSpaceOnUse" id="sakha-flag" width="700" height="1100">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/e/eb/Flag_of_Sakha.svg"
				width="700"
				height="1100"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="buryat-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Buryatia.svg"
				width="160"
				height="120"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="altai-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Altai_Republic.svg"
				width="110"
				height="55"
				x="-20"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="tuva-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Tuva.svg"
				width="100"
				height="75"
				y="-5"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="bashkortostan-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/3/3d/Flag_of_Bashkortostan.svg"
				width="130"
				height="90"
				x="-40"
				y="-5"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="mordovia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Mordovia.svg"
				width="50"
				height="30"
				x="-10"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="chuvashia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Chuvashia.svg"
				width="45"
				height="35"
				x="-10"
				y="-5"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="mari-el-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_Mari_El_%282006-2011%29.svg"
				width="45"
				height="45"
				y="-7"
				x="-5"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="udmurtia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Udmurtia.svg"
				width="65"
				height="40"
				x="-13"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="tatarstan-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Tatarstan.svg"
				width="60"
				height="50"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="karachay-cherkess-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Karachay-Cherkessia.svg"
				width="40"
				height="40"
				x="-10"
				y="-9"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="kabardino-balkar-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/d/d8/Flag_of_Kabardino-Balkaria.svg"
				width="24"
				height="18"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="alania-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/1/1c/Flag_of_North_Ossetia.svg"
				width="30"
				height="15"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="ingushetia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Ingushetia.svg"
				width="15"
				height="15"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="ichkeria-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/d/d6/Flag_of_Chechen_Republic_of_Ichkeria.svg"
				width="40"
				height="25"
				y="-4"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="kalmykia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Kalmykia.svg"
				width="105"
				height="120"
				x="-20"
				y="-32"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="dagestan-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_Dagestan.svg"
				width="90"
				height="60"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="karelia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Karel.svg"
				width="200"
				height="150"
				x="-25"
				y="-30"
			></image>
		</pattern>
		<pattern patternUnits="userSpaceOnUse" id="nenets-flag" width="300" height="300">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/1/15/Flag_of_Nenets_Autonomous_District.svg"
				width="300"
				height="250"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="ural-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Ural.svg"
				width={mapState.mansi ? '200' : '400'}
				height={mapState.mansi ? '200' : '250'}
				y={mapState.mansi ? '75' : '0'}
			></image>
		</pattern>
		<pattern patternUnits="userSpaceOnUse" id="siberian-flag" width="1100" height="900">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/1/13/Flag_of_Siberia.svg"
				width="1100"
				height="870"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="far-eastern-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/d/df/Flag_of_Far_East.svg"
				x="-320"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="kralovec-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/8/82/Flagge_Koenigsberg.jpg"
				width="50"
				height="40"
				x="-15"
				y="-5"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="adygea-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/1/16/Flag_of_Adygea.svg"
				width="60"
				height="35"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="khanty" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Khanty-Mansiysky_rayon_%28Yugra%29.svg"
			></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="mansi" width="1" height="1">
			<image href="https://upload.wikimedia.org/wikipedia/commons/7/70/Flag_of_Yugra.svg"></image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="nenets-nation-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Yamal-Nenets_Autonomous_District.svg"
				width="300"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="enets-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Nenets_people.png"
				height="90"
				x="-50"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="circassia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/5/5a/Circassian_flag.svg"
				height="30"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="karachay-balkar-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/5/5b/Ethnic_flag_of_the_Balkar_and_Karachay_peoples_%28Karachay-Balkaria%29.svg"
				height="35"
				x="-10"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="kamchatka-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Koryakia.svg"
				height="212"
				x="-70"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="chukotka-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_the_Free_State_of_Chutkotka.svg"
				width="255"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="taymyria-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Taymyr_Autonomous_Okrug.svg"
				width="150"
				x="-12"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="evenkia-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_Evenks.svg"
				width="210"
				x="-42"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="khanty-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Khanty-Mansiysky_rayon_%28Yugra%29.svg"
				height="140"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="mansi-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/7/70/Flag_of_Yugra.svg"
				height="110"
				x="-30"
			>
			</image>
		</pattern>
		<pattern patternUnits="objectBoundingBox" id="selkup-flag" width="1" height="1">
			<image
				href="https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Selkup_people.svg"
				height="120"
			>
			</image>
		</pattern>
	</defs>
	<ForeignTerritory />
	<Republics {i18n} />
	{#if mapState.nationalBorders}
		<ForeignBorders />
	{/if}
	{#if mapState.showAdministrativeBorders}
		<AdminBorders />
	{/if}
	<Claims {i18n} />
	<Rivers />
	<Lakes />
</svg>

<Popup {i18n} {isNoticeAcknowledged} />

<Sidebar {i18n} {locale} {isMobile} />

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
