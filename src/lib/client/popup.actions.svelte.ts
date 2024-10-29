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
		cssClass,
		name,
		description,
		population,
		capital,
		languages,
		flag,
		wikiLink,
	}: Omit<PopupInfo, 'popup' | 'info'> & { cssClass: string },
) {
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseleave', onmouseout);
	node.addEventListener('blur', onmouseout);
	// @ts-expect-error target is always a derivative of SVGElement
	node.addEventListener('mouseenter', onmouseenter);
	node.addEventListener('keydown', onkeydown);
	// @ts-expect-error target is always a derivative of SVGElement
	node.addEventListener('pointerup', onpointerrelease);

	function onmouseenter({ target }: MouseEvent & { target: SVGElement }) {
		if (
			target.classList.contains(cssClass) ||
			!!target.parentElement?.classList?.contains(cssClass) ||
			!!target.parentElement?.parentElement?.classList?.contains(cssClass)
		) {
			popupInfo.name = name;
			popupInfo.description = description;
			popupInfo.population = population;
			popupInfo.capital = capital;
			popupInfo.languages = languages;
			popupInfo.popup.show();
		}
	}

	function onpointerrelease({ target }: PointerEvent & { target: SVGElement }) {
		if (
			target.classList.contains(cssClass) ||
			!!target.parentElement?.classList?.contains(cssClass) ||
			!!target.parentElement?.parentElement?.classList?.contains(cssClass)
		) {
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
