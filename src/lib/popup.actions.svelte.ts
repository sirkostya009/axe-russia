import type { I18nKey } from './locales/types';

export interface PopupInfo {
	id?: I18nKey;
	flag?: string;
	popup?: HTMLDialogElement;
	info?: HTMLDialogElement;
}

export const popupInfo = $state<PopupInfo>({});

export function popup(node: SVGElement, flag?: string) {
	const { id } = node;
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseleave', onmouseout);
	node.addEventListener('blur', onmouseout);
	node.addEventListener('mouseenter', togglePopup);
	node.addEventListener('keydown', onkeydown);
	node.addEventListener('click', toggleInfo);
	if (typeof flag === 'string' && !flag.startsWith('https://'))
		flag = document.querySelector(`#${flag} image`)?.getAttribute('href') || '';

	function togglePopup() {
		popupInfo.id = id as I18nKey;
		popupInfo.popup!.show();
	}

	function toggleInfo() {
		popupInfo.id = id as I18nKey;
		popupInfo.flag = flag;
		popupInfo.info!.showModal();
	}
}

function onmousemove({ x, y }: MouseEvent) {
	popupInfo.popup!.style.left = x + window.scrollX + 'px';
	popupInfo.popup!.style.top  = y + window.scrollY + 'px';
}

function onmouseout() {
	popupInfo.popup!.close();
}

function onkeydown(e: KeyboardEvent) {
	if (!['Space'].includes(e.code)) {
		return;
	}
	if (document.activeElement === e.target) {
		e.target?.dispatchEvent(new Event('click'));
	}
}
