import type { I18n } from '$lib/locales/types';
import fs from 'node:fs';

export async function load({ cookies, request }): Promise<{
	locale: string;
	i18n: I18n;
	isMobile: boolean;
	isNoticeAcknowledged: boolean;
	theme?: string;
}> {
	const lang = cookies.get('locale') || request.headers.get('Accept-Language');
	const locale =
		/be|bg|br|cs|cy|da|de|el|en|es|et|fi|fr|ga|gd|hi|hu|it|jp|kk|ko|lt|lv|nl|no|pl|ro|ru|sk|sv|tr|ug|uk|zh-CN|zh-TW/.exec(
			lang!,
		)?.[0] || 'en';
	const ua = request.headers.get('User-Agent');
	return {
		locale,
		i18n: (await import(`$lib/locales/${locale}.ts`)).default,
		isMobile: !!ua?.match(/iPhone|Android|iPad/),
		isNoticeAcknowledged: cookies.get('notice-acknowledged') === 'true',
		theme: cookies.get('theme'),
	};
}
