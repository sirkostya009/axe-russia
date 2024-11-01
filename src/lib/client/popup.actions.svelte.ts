export interface PopupInfo {
	name?: string;
	description?: string;
	population?: string;
	capital?: string;
	languages?: string;
	flag?: string;
	wikiLink?: string;
	popup: HTMLDialogElement;
	info: HTMLDialogElement;
}

// @ts-expect-error popup and info will almost certainly get hydrated before user interaction
export const popupInfo = $state<PopupInfo>({});

export function popup(
	node: SVGElement,
	{
		name,
		description,
		population,
		capital,
		languages,
		flag,
		wikiLink,
	}: Omit<PopupInfo, 'popup' | 'info'>,
) {
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseleave', onmouseout);
	node.addEventListener('blur', onmouseout);
	node.addEventListener('mouseenter', onmouseenter);
	node.addEventListener('keydown', onkeydown);
	node.addEventListener('pointerup', onpointerrelease);
	if (typeof flag === 'string' && !flag.startsWith('https://'))
		flag = document.querySelector(`#${flag} image`)?.getAttribute('href') || '';

	function onmouseenter() {
		popupInfo.name = name;
		popupInfo.description = description;
		popupInfo.population = population;
		popupInfo.capital = capital;
		popupInfo.languages = languages;
		popupInfo.popup.show();
	}

	function onpointerrelease() {
		popupInfo.flag = flag;
		popupInfo.wikiLink = wikiLink;
		popupInfo.info.showModal();
	}
}

function onmousemove({ x, y }: MouseEvent) {
	const { style } = document.querySelector('.popup') as HTMLDialogElement;
	style.left = x + window.scrollX + 'px';
	style.top = y + window.scrollY + 'px';
}

function onmouseout() {
	popupInfo.popup.close();
}

function onkeydown(e: KeyboardEvent) {
	if (!['Space'].includes(e.code)) {
		return;
	}
	if (document.activeElement === e.target) {
		e.target?.dispatchEvent(new Event('click'));
	}
}
