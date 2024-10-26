import * as locales from '../locales';

function matchLocale(lang: string | null): keyof typeof locales {
	if (!lang) return 'en';
	for (const chunk of lang.split(';')) {
		const [first] = Object.keys(locales)
			.map((l) => ({ i: chunk.indexOf(l), l }))
			.filter(({ i }) => i != -1)
			.sort(({ i }) => i);
		if (first) {
			return first.l as keyof typeof locales;
		}
	}
	return 'en';
}

export async function load({ cookies, request }): Promise<{
	i18n: locales.I18n;
	locale: keyof typeof locales;
	isMobile: boolean;
	isNoticeAcknowledged: boolean;
}> {
	const lang = cookies.get('locale') || request.headers.get('Accept-Language');
	const locale = matchLocale(lang);
	const ua = request.headers.get('User-Agent');
	return {
		locale,
		i18n: locales[locale] as locales.I18n,
		isMobile: !!ua?.match(/iPhone|Android|iPad/),
		isNoticeAcknowledged: cookies.get('notice-acknowledged') === 'true',
	};
}
