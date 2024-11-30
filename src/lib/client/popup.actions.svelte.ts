import type { ActionReturn } from 'svelte/action';

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

type PopupData = Omit<PopupInfo, 'popup' | 'info'>;

export function popup(
	node: SVGElement,
	{ name, description, population, capital, languages, flag, wikiLink }: PopupData,
): ActionReturn<PopupData> {
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseleave', onmouseout);
	node.addEventListener('blur', onmouseout);
	node.addEventListener('mouseenter', togglePopup);
	node.addEventListener('keydown', onkeydown);
	node.addEventListener('click', toggleInfo);
	if (typeof flag === 'string' && !flag.startsWith('https://'))
		flag = document.querySelector(`#${flag} image`)?.getAttribute('href') || '';

	return {
		update(newValues: PopupData) {
			name = newValues.name;
			description = newValues.description;
			population = newValues.population;
			capital = newValues.capital;
			languages = newValues.languages;
			wikiLink = newValues.wikiLink;
		},
		destroy() {
			node.removeEventListener('mousemove', onmousemove);
			node.removeEventListener('mouseleave', onmouseout);
			node.removeEventListener('blur', onmouseout);
			node.removeEventListener('mouseenter', togglePopup);
			node.removeEventListener('keydown', onkeydown);
			node.removeEventListener('click', toggleInfo);
		},
	};

	function togglePopup() {
		popupInfo.name = name;
		popupInfo.description = description;
		popupInfo.population = population;
		popupInfo.capital = capital;
		popupInfo.languages = languages;
		popupInfo.popup.show();
	}

	function toggleInfo() {
		popupInfo.name = name;
		popupInfo.description = description;
		popupInfo.population = population;
		popupInfo.capital = capital;
		popupInfo.languages = languages;
		popupInfo.flag = flag;
		popupInfo.wikiLink = wikiLink;
		popupInfo.info.showModal();
	}
}

function onmousemove({ x, y }: MouseEvent) {
	popupInfo.popup.style.left = x + window.scrollX + 'px';
	popupInfo.popup.style.top = y + window.scrollY + 'px';
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
