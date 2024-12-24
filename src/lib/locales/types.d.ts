type i18n = (typeof import('$lib/locales/en'))['default'];

export type I18nKey = keyof Omit<i18n, 'sidebar' | 'notice' | 'wikipedia' | 'popup'>;

export type I18n =
	& Record<
		I18nKey,
		{
			name: string;
			description?: string;
			capital?: string;
			population?: string;
			languages?: string;
			wikiLink?: string;
		}
	>
	& Pick<i18n, 'sidebar' | 'notice' | 'wikipedia' | 'popup'>;
