import * as locales from '../locales';

const regex = new RegExp(Object.keys(locales).join('|'));

export function load({ cookies, request }): {
	i18n: locales.I18n;
	locale: keyof typeof locales;
	isMobile: boolean;
	isNoticeAcknowledged: boolean;
} {
	const lang = cookies.get('locale') || request.headers.get('Accept-Language');
	const locale = (regex.exec(lang!)?.[0] || 'en') as keyof typeof locales;
	const ua = request.headers.get('User-Agent');
	return {
		locale,
		i18n: locales[locale] as locales.I18n,
		isMobile: !!ua?.match(/iPhone|Android|iPad/),
		isNoticeAcknowledged: cookies.get('notice-acknowledged') === 'true',
	};
}
