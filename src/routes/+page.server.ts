import { i18n } from '$lib/i18n.svelte.js';
import * as locales from '$lib/locales';

const regex = new RegExp(Object.keys(locales).join('|'));

export function load({ cookies, request }): {
	locale: keyof typeof locales;
	isMobile: boolean;
	isNoticeAcknowledged: boolean;
	theme?: string;
} {
	const lang = cookies.get('locale') || request.headers.get('Accept-Language');
	const locale = (regex.exec(lang!)?.[0] || 'en') as keyof typeof locales;
	const ua = request.headers.get('User-Agent');
	// @ts-expect-error
	i18n.data = locales[locale];
	return {
		locale,
		isMobile: !!ua?.match(/iPhone|Android|iPad/),
		isNoticeAcknowledged: cookies.get('notice-acknowledged') === 'true',
		theme: cookies.get('theme'),
	};
}
