import type { ActionReturn } from 'svelte/action';
import { i18n } from '$lib/i18n.svelte';

export interface PopupInfo {
	id: string;
	flag?: string;
	popup: HTMLDialogElement;
	info: HTMLDialogElement;
}

export const popupInfo = $state({} as PopupInfo);

type PopupData = Omit<PopupInfo, 'popup' | 'info'>;

export function popup(node: SVGElement, flag?: string): ActionReturn<PopupData> {
	const { id } = node;
	node.addEventListener('mousemove', onmousemove);
	node.addEventListener('mouseleave', onmouseout);
	node.addEventListener('blur', onmouseout);
	node.addEventListener('mouseenter', togglePopup);
	node.addEventListener('keydown', onkeydown);
	node.addEventListener('click', toggleInfo);
	if (typeof flag === 'string' && !flag.startsWith('https://'))
		flag = document.querySelector(`#${flag} image`)?.getAttribute('href') || '';

	return {
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
		popupInfo.id = id;
		popupInfo.popup.show();
	}

	function toggleInfo() {
		popupInfo.id = id;
		popupInfo.flag = flag;
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
