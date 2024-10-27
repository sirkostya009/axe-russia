<script lang="ts">
	import { browser } from '$app/environment';
	import { __state, mapState } from '$lib/client/state.svelte';
	import type { I18n } from '../locales';

	interface Props {
		i18n: I18n;
		locale: string;
		isMobile: boolean;
	}

	let { i18n, locale, isMobile }: Props = $props();

	let sideBarOpened = $state(!isMobile);

	if (browser) {
		for (const key in mapState) {
			const item = localStorage?.getItem(key);
			__state[key] = __state[key] instanceof Boolean ? item === 'true' : (item || __state[key]);
		}

		sideBarOpened = !navigator.userAgent.match(/iPhone|Android|iPad/);
	}
</script>

<aside class="sidebar" class:shown={sideBarOpened}>
	<form>
		<section class="head-bar">
			<label>
				<select
					name="locale"
					value={locale}
					onchange={(e) => {
						document.cookie = `locale=${e.currentTarget?.value}; SameSite=Lax; Max-Age=34559999`;
						location.reload();
					}}
				>
					<option value="uk">Укр</option>
					<option value="en">Eng</option>
					<option value="ru">Рос</option>
				</select>
			</label>
			<label>
				<select bind:value={mapState.theme}>
					<option value="auto">System</option>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</label>
		</section>
		<section>
			<h3>{i18n.sidebar.exFederalRepublics.title}</h3>
			<label>
				<input type="checkbox" bind:checked={mapState.projectUralRepublic} />
				{i18n.sidebar.exFederalRepublics.projectUralRepublic}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.projectSiberianRepublic} />
				{i18n.sidebar.exFederalRepublics.projectSiberianRepublic}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.projectFarEast} />
				{i18n.sidebar.exFederalRepublics.projectFarEast}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.projectKralovec} />
				{i18n.sidebar.exFederalRepublics.projectKralovec}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.projectNewRepublic} />
				{i18n.sidebar.exFederalRepublics.projectNewRepublic}
			</label>
		</section>
		<section>
			<h3>{i18n.sidebar.republics.title}</h3>
			<label>
				<input type="checkbox" bind:checked={mapState.adygeaIndependent} />
				{i18n.sidebar.republics.adygeaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.altaiIndependent} />
				{i18n.sidebar.republics.altaiIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.bashkortostanIndependent} />
				{i18n.sidebar.republics.bashkortostanIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.buryatiaIndependent} />
				{i18n.sidebar.republics.buryatiaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.ichkeriaIndependent} />
				{i18n.sidebar.republics.ichkeriaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.chuvashIndependent} />
				{i18n.sidebar.republics.chuvashIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.dagestanIndependent} />
				{i18n.sidebar.republics.dagestanIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.ingushetiaIndependent} />
				{i18n.sidebar.republics.ingushetiaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.kabardinoBalkarIndependent} />
				{i18n.sidebar.republics.kabardinoBalkarIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.kalmykiaIndependent} />
				{i18n.sidebar.republics.kalmykiaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.karachayCherkessiaIndependent} />
				{i18n.sidebar.republics.karachayCherkessiaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.kareliaIndependent} />
				{i18n.sidebar.republics.kareliaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.khakassiaIndependent} />
				{i18n.sidebar.republics.khakassiaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.komiIndependent} />
				{i18n.sidebar.republics.komiIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.mariElIndependent} />
				{i18n.sidebar.republics.mariElIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.mordoviaIndependent} />
				{i18n.sidebar.republics.mordoviaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.northOssetiaAlaniaIndependent} />
				{i18n.sidebar.republics.northOssetiaAlaniaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.sakhaIndependent} />
				{i18n.sidebar.republics.sakhaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.tatarstanIndependent} />
				{i18n.sidebar.republics.tatarstanIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.tuvaIndependent} />
				{i18n.sidebar.republics.tuvaIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.udmurtIndependent} />
				{i18n.sidebar.republics.udmurtIndependent}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.nenetsIndependence} />
				{i18n.sidebar.republics.nenetsIndependence}
			</label>
		</section>
		<section>
			<h3>{i18n.sidebar.claims.title}</h3>
			<label>
				<input type="checkbox" bind:checked={mapState.greaterKarelia} />
				{i18n.sidebar.claims.greaterKarelia}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.polishPrussia} />
				{i18n.sidebar.claims.polishPrussia}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.lithuaniaMinor} />
				{i18n.sidebar.claims.lithuaniaMinor}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.petsamo} />
				{i18n.sidebar.claims.petsamo}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.salla} />
				{i18n.sidebar.claims.salla}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.latvianClaim} />
				{i18n.sidebar.claims.latvianClaim}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.estonianClaim} />
				{i18n.sidebar.claims.estonianClaim}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.belarusClaim} />
				{i18n.sidebar.claims.belarusClaim}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.sudzha} />
				{i18n.sidebar.claims.sudzha}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.tahanrih} />
				{i18n.sidebar.claims.tahanrih}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.starodub} />
				{i18n.sidebar.claims.starodub}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.sloboda} />
				{i18n.sidebar.claims.sloboda}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.kurilIslands} />
				{i18n.sidebar.claims.kurilIslands}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.franzJosefLand} />
				{i18n.sidebar.claims.franzJosefLand}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.finishIsles} />
				{i18n.sidebar.claims.finishIsles}
			</label>
		</section>
		<section>
			<h3>{i18n.sidebar.miscellaneous.title}</h3>
			<label>
				<input type="checkbox" bind:checked={mapState.showAdministrativeBorders} />
				{i18n.sidebar.miscellaneous.showAdministrativeBorders}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.nationalBorders} />
				{i18n.sidebar.miscellaneous.nationalBorders}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.showFlags} />
				{i18n.sidebar.miscellaneous.showFlags}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.showLakes} />
				{i18n.sidebar.miscellaneous.showLakes}
			</label>
			<label>
				<input type="checkbox" bind:checked={mapState.showRivers} />
				{i18n.sidebar.miscellaneous.showRivers}
			</label>
		</section>
	</form>
</aside>

<button
	type="button"
	aria-label="menu"
	class="toggler"
	onmousedown={() => {
		sideBarOpened = !sideBarOpened;
		const dialog = document.querySelector('.info') as HTMLDialogElement;
		dialog.close();
	}}
>
	<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
		<path
			d={sideBarOpened
				? 'M2.8,23.8l-2.3-2.4,9.2-9.5L.4,2.5,2.8.2l9.2,9.5L21.2.2l2.3,2.4-9.2,9.5,9.2,9.5-2.3,2.4-9.2-9.5L2.8,23.8Z'
				: 'M3,19.2l-2.7-2.7L12,4.8l11.8,11.8-2.7,2.7-9-9L3,19.2Z'}
		/>
	</svg>
</button>

<style>
	.sidebar {
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

	.toggler {
		display: none;
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

		label {
			width: 30%;
		}
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

		.toggler {
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
	}
</style>
