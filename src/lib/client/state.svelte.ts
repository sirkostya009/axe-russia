const __state = $state({
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
	theme: 'auto',
});

export type MapState = typeof __state;

export const mapState: MapState = new Proxy(__state, {
	set(target, p: keyof MapState, newValue) {
		globalThis?.localStorage?.setItem(p, newValue);
		// @ts-expect-error
		target[p] = newValue;
		return true;
	},
	get: (target, p: keyof MapState) => target[p],
});
