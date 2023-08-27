import { superValidate } from 'sveltekit-superforms/server';

import { linksSchema } from '$lib/utils/zod';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(linksSchema);

	return { form, apiError: null };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, linksSchema);

		if (!form.valid) {
			return fail(400, { form, apiError: null });
		}

		return { form, apiError: null };
	}
};
