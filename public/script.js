'use strict';

/** @param {{}} language */
function updateLanguage(language, element = document) {
	for (let i18n of element.querySelectorAll("[i18n]")) {
		let value = language;
		for (let v of i18n.getAttribute("i18n").split(".")) {
			value = value?.[v];
		}
		if (value) i18n.textContent = value;
	}
}

const sidebar = document.getElementById("sidebar");

if ("language" in localStorage) {
	window.language = JSON.parse(localStorage.language);
	document.documentElement.lang = window.language.lang;
	updateLanguage(window.language);
} else {
	import(
		`./locales/${
			/be|bg|br|cs|cy|da|de|el|en|es|et|fi|fr|ga|gd|hi|hu|it|jp|kk|ko|lt|lv|nl|no|pl|ro|ru|sk|sv|tr|ug|uk|zh-CN|zh-TW/.exec(
				navigator.language
			) || "en"
		}.js`
	).then(({ default: l }) => {
		window.language = l;
		localStorage.language = JSON.stringify(window.language);
		updateLanguage(window.language);
	});
}

if (window.matchMedia("(min-width: 1024px)").matches) {
	sidebar.classList.remove("hidden");
}

const map = document.getElementById("map");

document.getElementById("toggler").onclick = () => {
	map.style.pointerEvents = "none";
	sidebar.classList.toggle("hidden");
	setTimeout(() => (map.style.pointerEvents = null), 300);
};

/** @type {HTMLDialogElement} */
const popup = document.getElementById("popup");
/** @type {HTMLDialogElement} */
const info = document.getElementById("info");
/** @type {HTMLAnchorElement} */
const wikiLink = info.querySelector("a[i18n]");

const closePopup = popup.close.bind(popup);

/** @this {SVGElement} */
function togglepopup() {
	const description = window.language[this.id];
	updateLanguage(description, popup);
	popup.querySelector('[i18n="capital"]').parentElement.style.display = "capital" in description ? null : "none";
	popup.querySelector('[i18n="population"]').parentElement.style.display =
		"population" in description ? null : "none";
	popup.show();
}

/** @this {SVGElement} */
function movepopup({ x, y }) {
	popup.style.left = x + window.scrollX + "px";
	popup.style.top = y + window.scrollY + "px";
}

for (const mapEntity of document.querySelectorAll("[data-popup]")) {
	let flag = mapEntity.getAttribute("data-popup");
	if (flag && !flag.startsWith("https")) {
		flag = document.getElementById(flag)?.children[0]?.getAttribute("href");
	}

	mapEntity.onmousedown = toggleinfo;
	mapEntity.onmouseleave = closePopup;
	mapEntity.onmouseenter = togglepopup;
	mapEntity.onmousemove = movepopup;

	/** @this {SVGElement} */
	function toggleinfo() {
		const description = window.language[this.id];
		updateLanguage(description, info);
		if (!wikiLink.parentElement.classList.toggle("hidden", !description.wikiLink)) {
			wikiLink.innerHTML = `<p>${window.language.wikipedia}</p>`;
			wikiLink.href = description.wikiLink;
		}
		info.querySelector('[i18n="capital"]').parentElement.style.display = "capital" in description ? null : "none";
		info.querySelector('[i18n="population"]').parentElement.style.display =
			"population" in description ? null : "none";
		info.style.backgroundImage = `url(${flag})`;
		info.showModal();
	}
}

/** @this {HTMLSelectElement} */
document.querySelector('select[name="locale"]').onchange = async function (e) {
	e.stopPropagation();
	window.language = (await import(`./locales/${this.value}.js`)).default;
	updateLanguage(window.language, sidebar);
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
sidebar.querySelector('form').onchange = (e) => {
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
