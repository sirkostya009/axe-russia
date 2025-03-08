<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { popupInfo } from '$lib/popup.actions.svelte';
	import mapState, { type MapState } from '$lib/state.svelte';

	interface Props {
		toggleSidebar(state: boolean): void;
	}

	let { toggleSidebar }: Props = $props();

	let sideBarOpened = $state(!page.data.isMobile);

	function* keysOf(t: object) {
		for (const key in t) {
			if (key === 'title' || key === 'locale') continue;
			yield key as keyof MapState;
		}
	}
</script>

{#snippet checkboxSection(i18n: Record<string, string>)}
<section>
	<h3>{i18n.title}</h3>
	{#each keysOf(i18n) as key}
	<label>
		<input type="checkbox" bind:checked={mapState[key]} />
		{i18n[key]}
	</label>
	{/each}
</section>
{/snippet}

<aside class="sidebar" class:shown={sideBarOpened}>
	<form>
		<section class="head-bar">
			<label>
				<select
					name="locale"
					onchange={({ currentTarget: { value } }) => {
						document.cookie = `locale=${value}; SameSite=Lax; Max-Age=34559999`;
						document.documentElement.lang = value;
						invalidateAll();
					}}
				>
					<option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
					<option value="it">🇮🇹</option>
					<option value="es">🇪🇸</option>
					<option value="br">🇧🇷</option>
					<option value="de">🇩🇪</option>
					<option value="sv">🇸🇪</option>
					<option value="no">🇳🇴</option>
					<option value="da">🇩🇰</option>
					<option value="fi">🇫🇮</option>
					<option value="et">🇪🇪</option>
					<option value="fr">🇫🇷</option>
					<option value="ro">🇷🇴</option>
					<option value="lt">🇱🇹</option>
					<option value="hu">🇭🇺</option>
					<option value="nl">🇳🇱</option>
					<option value="ko">🇰🇷</option>
					<option value="jp">🇯🇵</option>
					<option value="zh-TW">🇹🇼</option>
					<option value="zh-CN">🇨🇳</option>
					<option value="ug">☪️🟦</option>
					<option value="tr">🇹🇷</option>
					<option value="hi">🇮🇳</option>
					<option value="el">🇬🇷</option>
					<option value="gd">🏴󠁧󠁢󠁳󠁣󠁴󠁿</option>
					<option value="cy">🏴󠁧󠁢󠁷󠁬󠁳󠁿</option>
					<option value="ga">🇮🇪</option>
					<option value="pl">🇵🇱</option>
					<option value="sk">🇸🇰</option>
					<option value="cs">🇨🇿</option>
					<option value="kk">🇰🇿</option>
					<option value="uk">🇺🇦</option>
					<option value="be">🇧🇾</option>
					<option value="ru">🇷🇺</option>
				</select>
				{@html `<script>
				document.querySelector('select[name="locale"]').value = '${page.data.locale}';
				document.documentElement.lang = '${page.data.locale}';
				</script>`}
			</label>
			<span>
				<a aria-label="github" href="https://github.com/sirkostya009/axe-russia">
					<img alt="GitHub" width="25px" height="25px" src="https://github.githubassets.com/favicons/favicon-dark.svg">
				</a>
			</span>
			<label>
				<select
					name="theme"
					onchange={({ currentTarget: { value } }) => {
						document.body.classList.remove('dark-theme', 'light-theme');
						document.cookie = `theme=${value}; SameSite=Lax; Max-Age=34559999`;
						if (value === 'auto') return;
						document.body.classList.add(value + '-theme');
					}}
				>
					<option value="auto">System</option>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
				{#if page.data.theme}
					{@html `<script>
					document.querySelector('select[name="theme"]').value = '${page.data.theme}';
					// crazy hack to prevent theme from blinking
					document.body.classList.add('${page.data.theme}-theme');
					</script>`}
				{/if}
			</label>
		</section>
		{@render checkboxSection(page.data.i18n.sidebar.exFederalRepublics)}
		{@render checkboxSection(page.data.i18n.sidebar.republics)}
		{@render checkboxSection(page.data.i18n.sidebar.claims)}
		{@render checkboxSection(page.data.i18n.sidebar.miscellaneous)}
	</form>
</aside>

<button
	type="button"
	aria-label="menu"
	class="toggler"
	onmousedown={() => {
		popupInfo?.info?.close();
		toggleSidebar(!sideBarOpened);
		sideBarOpened = !sideBarOpened;
	}}
	class:hidden-on-pc={!sideBarOpened}
>
	<svg width="24px" height="24px" viewBox="0 0 24 24">
		<path class="menu-button" class:close-button={sideBarOpened} />
	</svg>
</button>

<style>
	.sidebar {
		display: none;
		background-color: var(--main-color);
		min-width: var(--sidebar-width);
		width: 10%;
		height: 100%;
		overflow: auto;
		position: absolute;
		left: 0;
		top: 0;
		overflow-x: hidden;
	}

	.sidebar.shown {
		display: block;
	}

	.toggler {
		/* all: unset; */
		appearance: none;
		position: absolute;
		border-color: var(--secondary-color);
		background-color: var(--main-color);
		color: var(--secondary-color);
		fill: var(--text-color);
		left: var(--sidebar-width);
		top: calc(50% - 50px);
		height: 100px;
		border-radius: 0 8px 8px 0;
	}

	.hidden-on-pc {
		left: 0;
	}

	.menu-button {
		d: path('M.1,2.7L2.8,0l11.7,11.7L2.7,23.5l-2.7-2.7,9-9L.1,2.7Z');
	}

	.menu-button.close-button {
		d: path('M14.4,20.8l-2.7,2.7L0,11.8,11.8,0l2.7,2.7L5.5,11.7l8.9,9.1Z');
	}

	.sidebar form {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px 5px;
	}

	h3 {
		margin: 10px 0;
	}

	select option {
		padding: 10px;
	}

	.sidebar form section {
		display: flex;
		flex-direction: column;
	}

	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		cursor: pointer;
		gap: 5px;
		user-select: none;
	}

	.sidebar form section.head-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		label {
			width: 30%;
		}
	}

	.head-bar label {
		flex-basis: 100%;
	}

	.head-bar span {
		height: 30px;
		background-color: var(--main-color);
		border-color: var(--secondary-color);
		border-radius: 4px;
		text-align: center;
		flex-basis: 100%;
	}

	input[type='checkbox'] {
		appearance: none;
		min-width: 18px;
		min-height: 18px;
		border-radius: 4px;
		position: relative;
		cursor: pointer;
		transition: background 0.3s ease;
		background-color: rgba(255, 255, 255, 0.85);
	}

	input[type='checkbox']:checked {
		background-color: var(--secondary-color);
	}

	input[type='checkbox']::after {
		content: '';
		position: absolute;
		width: 10px;
		height: 6px;
		border: 2px solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(-45deg) scaleX(-1);
		left: 3px;
		top: 4px;
		display: none;
	}

	input[type='checkbox']:checked::after {
		display: block;
	}

	select {
		appearance: none;
		height: 30px;
		background-color: var(--main-color);
		border-color: var(--secondary-color);
		border-radius: 4px;
		width: 100%;
		text-align: center;
	}

	@media (max-width: 1023px) {
		:root {
			--toggler-height: 65px;
		}

		.sidebar {
			width: 100%;
			height: 100%;
			display: none;
			animation: hide 0.5s;
		}

		@keyframes appear {
			from {
				translate: 0 100vh;
			}
			to {
				translate: 0 0;
			}
		}

		@keyframes hide {
			from {
				display: block;
				translate: 0 0;
			}
			to {
				display: none;
				translate: 0 100vh;
			}
		}

		.sidebar.shown {
			display: block;
			animation: appear 0.5s;
		}

		select {
			height: 40px;
		}

		input[type='checkbox'] {
			width: 30px;
			height: 30px;
		}

		input[type='checkbox']::after {
			width: 16px;
			height: 10px;
			left: 6px;
			top: 8px;
		}

		.menu-button {
			d: path('M3,19.2l-2.7-2.7L12,4.8l11.8,11.8-2.7,2.7-9-9L3,19.2Z');
		}

		.menu-button.close-button {
			d: path('M2.8,23.8l-2.3-2.4,9.2-9.5L.4,2.5,2.8.2l9.2,9.5L21.2.2l2.3,2.4-9.2,9.5,9.2,9.5-2.3,2.4-9.2-9.5L2.8,23.8Z');
		}

		.toggler {
			left: unset;
			top: unset;
			display: block;
			position: absolute;
			bottom: 0;
			right: 0;
			height: var(--toggler-height);
			width: var(--toggler-height);
			margin: 0 5px 5px 0;
			border-color: transparent;
			border-radius: 8px;
			opacity: 0.8;
			background-color: var(--secondary-color);
		}

		.toggler svg {
			fill: var(--text-color);
		}

		.hidden-on-pc {
			left: unset;
		}
	}
</style>
