import { json, type RequestEvent } from '@sveltejs/kit';
import * as locales from '$lib/locales';

export function GET({ params }: RequestEvent) {
	if (params.locale! in locales) {
		// @ts-expect-error
		return json(locales[params.locale!], {
			headers: {
				'Cache-Control': 'max-age=259200',
			},
		});
	} else {
		return new Response(null, { status: 404 });
	}
}
