'use strict';

/** @type {HTMLButtonElement} */
const toggler = document.querySelector('button.toggler');
const sidebar = document.querySelector('aside.sidebar');

if (window.matchMedia('(max-width: 1023px)').matches) {
	/** @this {HTMLButtonElement} */
	toggler.onclick = function () {
		this.querySelector('path').classList.toggle('close-button');
		sidebar.classList.toggle('hidden');
	};
} else {
	const map = document.getElementById('map');
	toggler.querySelector('path').classList.toggle('close-button');
	sidebar.classList.toggle('hidden');
	/** @this {HTMLButtonElement} */
	toggler.onclick = function () {
		this.querySelector('path').classList.toggle('close-button');
		if (sidebar.classList.toggle('hidden')) {
			map.style.marginLeft = 0;
			this.style.left = 0;
		} else {
			map.style.marginLeft = null;
			this.style.left = null;
		}
	};
}

/** @type {HTMLDialogElement} */
const popup = document.getElementById('popup');
/** @type {HTMLDialogElement} */
const info = document.getElementById('info');

const wikiLink = info.querySelector('a[i18n]');

/** @param {{}} language */
function updateLanguage(language, doc = document) {
	for (let i18n of doc.querySelectorAll('[i18n]')) {
		let value = language;
		let attr = i18n.getAttribute('i18n');
		if (attr.startsWith('#')) {
			value = window.language;
			attr = attr.substring(1);
		}
		for (let v of attr.split('.')) {
			value = value?.[v];
		}
		if (value) i18n.textContent = value;
	}
}

if ('language' in localStorage) {
	window.language = JSON.parse(localStorage.language);
	document.documentElement.lang = window.language.lang;
	updateLanguage(window.language);
} else {
	import(
		`./locales/${
			/be|bg|br|cs|cy|da|de|el|en|es|et|fi|fr|ga|gd|hi|hu|it|jp|kk|ko|lt|lv|nl|no|pl|ro|ru|sk|sv|tr|ug|uk|zh-CN|zh-TW/.exec(
				navigator.language,
			) || 'en'
		}.js`
	).then(({ default: l }) => {
		window.language = l;
		localStorage.language = JSON.stringify(window.language);
		updateLanguage(window.language);
	});
}

const closePopup = popup.close.bind(popup);

/** @this {SVGElement} */
function togglepopup() {
	updateLanguage(window.language[this.id], popup);
	popup.show();
}

/** @this {SVGElement} */
function movepopup({ x, y }) {
	popup.style.left = x + window.scrollX + 'px';
	popup.style.top = y + window.scrollY + 'px';
}

for (const mapEntity of document.querySelectorAll('[data-popup]')) {
	let flag = mapEntity.getAttribute('data-popup');
	if (flag && !flag.startsWith('https')) {
		flag = document.getElementById(flag)?.children[0]?.getAttribute('href');
	}

	mapEntity.onclick = toggleinfo;
	mapEntity.onmouseleave = closePopup;
	mapEntity.onmouseenter = togglepopup;
	mapEntity.onmousemove = movepopup;

	/** @this {SVGElement} */
	function toggleinfo() {
		const description = window.language[this.id];
		updateLanguage(description, info);
		wikiLink.parentElement.classList.toggle('hidden', 'wikiLink' in description);
		wikiLink.href = description.wikiLink;
		info.style.backgroundImage = `url(${flag})`;
		info.showModal();
	}
}

/** @this {HTMLSelectElement} */
document.querySelector('select[name="locale"]').onchange = async function (e) {
	e.stopPropagation();
	window.language = (await import(`./locales/${this.value}.js`)).default;
	updateLanguage(window.language);
	localStorage.language = JSON.stringify(window.language);
};

/** @this {HTMLSelectElement} */
document.querySelector('select[name="theme"]').onchange = function (e) {
	e.stopPropagation();
	document.documentElement.classList.toggle(
		'dark',
		this.value === 'dark' ||
			(this.value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches),
	);
	if (this.value === 'auto') localStorage.removeItem('theme');
	else localStorage.theme = this.value;
};

for (let i = 0; i < localStorage.length; ++i) {
	const name = localStorage.key(i);
	if (!name || name in Storage || ['language'].includes(name)) continue;
	if (name === 'showFlags') { localStorage[name] = 'false'; continue; }

	document.querySelector(`input[name="${name}"]`).checked = localStorage[name] === 'true';
	toggle(name, localStorage[name] === 'true');
}

/** @param {Event & { target: HTMLInputElement }} e */
document.querySelector('.sidebar form').onchange = (e) => {
	toggle(e.target.name, e.target.checked);
	if (e.target.name === 'showFlags') return;
	localStorage[e.target.name] = e.target.checked;
};

function toggle(p, checked) {
	p = p.toLowerCase();
	for (const el of document.querySelectorAll(`[data-${p}]`)) {
		const attr = el.getAttribute(`data-` + p);

		for (const notation of attr.split(',')) {
			const negated = notation.startsWith('!');

			el.classList.toggle(negated ? notation.substring(1) : notation, negated ^ checked);
		}
	}
}
