import type { I18n } from '$lib/locales/types';
import fs from 'node:fs';

const regex = new RegExp(
	fs
		.readdirSync('src/lib/locales/')
		.map((s) => /^(.{2,5}).ts$/.exec(s)?.[1])
		.filter(Boolean)
		.join('|'),
);

export async function load({ cookies, request }): Promise<{
	locale: string;
	i18n: I18n;
	isMobile: boolean;
	isNoticeAcknowledged: boolean;
	theme?: string;
}> {
	const lang = cookies.get('locale') || request.headers.get('Accept-Language');
	const locale = regex.exec(lang!)?.[0] || 'en';
	const ua = request.headers.get('User-Agent');
	return {
		locale,
		i18n: (await import(`$lib/locales/${locale}.ts`)).default,
		isMobile: !!ua?.match(/iPhone|Android|iPad/),
		isNoticeAcknowledged: cookies.get('notice-acknowledged') === 'true',
		theme: cookies.get('theme'),
	};
}
