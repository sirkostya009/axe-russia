export interface PopupInfo {
	name?: string;
	description?: string;
	population?: string;
	capital?: string;
	languages?: string;
	flag?: string;
	wikiLink?: string;
}

export const popupInfo = $state<PopupInfo>({});

export function popup(
	node: SVGElement,
	{
		cssClass,
		name,
		description,
		population,
		capital,
		languages,
		flag,
		wikiLink,
	}: PopupInfo & { cssClass: string },
) {
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseout', onmouseout);
	node.addEventListener('blur', onmouseout);
	node.addEventListener('mouseenter', onmouseenter);
	node.addEventListener('keydown', onkeydown);
	node.addEventListener('pointerup', onpointerrelease);

	function onmouseenter({ target }: MouseEvent & { target: SVGElement }) {
		if (
			target.classList.contains(cssClass) ||
			!!target.parentElement?.classList?.contains(cssClass) ||
			!!target.parentElement?.parentElement?.classList?.contains(cssClass)
		) {
			const popup = document.querySelector('.popup') as HTMLDialogElement;
			popupInfo.name = name;
			popupInfo.description = description;
			popupInfo.population = population;
			popupInfo.capital = capital;
			popupInfo.languages = languages;
			popup.show();
		}
	}

	function onpointerrelease(this: SVGElement, { target }: PointerEvent & { target: SVGElement }) {
		if (
			target.classList.contains(cssClass) ||
			!!target.parentElement?.classList?.contains(cssClass) ||
			!!target.parentElement?.parentElement?.classList?.contains(cssClass)
		) {
			const info = document.querySelector('.info') as HTMLDialogElement;
			popupInfo.name = name;
			popupInfo.description = description;
			popupInfo.population = population;
			popupInfo.capital = capital;
			popupInfo.languages = languages;
			popupInfo.flag = flag;
			popupInfo.wikiLink = wikiLink;
			info.showModal();
		}
	}
}

function onmousemove({ x, y }: MouseEvent) {
	const { style } = document.querySelector('.popup') as HTMLDialogElement;
	style.left = x + window.scrollX + 'px';
	style.top = y + window.scrollY + 'px';
}

function onmouseout() {
	(document.querySelector('.popup') as HTMLDialogElement).close();
}

function onkeydown(e: KeyboardEvent) {
	if (!['Space'].includes(e.code)) {
		return;
	}
	if (document.activeElement === e.target) {
		e.target?.dispatchEvent(new Event('click'));
	}
}
