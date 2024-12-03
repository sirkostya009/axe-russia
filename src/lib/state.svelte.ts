import { browser } from '$app/environment';

const state = $state({
	projectNewRepublic: true,
	adygeaIndependent: true,
	altaiIndependent: true,
	bashkortostanIndependent: true,
	buryatiaIndependent: true,
	ichkeriaIndependent: true,
	chuvashIndependent: true,
	dagestanIndependent: true,
	ingushetiaIndependent: true,
	kabardinoBalkarIndependent: true,
	kalmykiaIndependent: true,
	karachayCherkessiaIndependent: true,
	kareliaIndependent: true,
	khakassiaIndependent: true,
	komiIndependent: true,
	mariElIndependent: true,
	mordoviaIndependent: true,
	northOssetiaAlaniaIndependent: true,
	sakhaIndependent: true,
	tatarstanIndependent: true,
	tuvaIndependent: true,
	udmurtIndependent: true,
	nenetsIndependence: true,
	greaterKarelia: false,
	polishPrussia: false,
	lithuaniaMinor: false,
	petsamo: true,
	salla: true,
	latvianClaim: true,
	estonianClaim: true,
	belarusClaim: false,
	sudzha: false,
	tahanrih: false,
	starodub: false,
	sloboda: false,
	projectUralRepublic: true,
	projectSiberianRepublic: true,
	projectFarEast: true,
	projectKralovec: true,
	kurilIslands: true,
	franzJosefLand: true,
	finishIsles: true,
	nationalBorders: false,
	showAdministrativeBorders: false,
	showFlags: true,
	showLakes: true,
	showRivers: true,
	nenetsNation: false,
	selkupTerritory: false,
	khanty: false,
	mansi: false,
	komiPermyakUnion: false,
	karachayBalkar: false,
	circassia: false,
	altaiExtended: false,
	chukotka: false,
	kamchatka: false,
	taymyria: false,
	evenkia: false,
	enets: false,
	greaterBuryatia: false,
});

export type MapState = typeof state;

export default new Proxy(state, {
	set(target, p: keyof MapState, newValue) {
		globalThis?.localStorage?.setItem(p, newValue);
		target[p] = newValue;
		return true;
	},
	get: (target, p: keyof MapState) => target[p],
});

if (browser) {
	for (const key in localStorage) {
		if (key in Storage.prototype) continue;
		state[key as keyof MapState] = localStorage[key] === 'true';
	}
}
