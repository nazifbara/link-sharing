import { superValidate } from 'sveltekit-superforms/server';

import { linksSchema } from '$lib/utils/zod';

export const load = async () => {
	const form = await superValidate(linksSchema);

	return { form, apiError: null };
};
