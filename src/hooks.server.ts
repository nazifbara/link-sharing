import { redirect, type Handle } from '@sveltejs/kit';

import { authenticateUser } from '$lib/utils/adminClient';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);

	if (event.url.pathname.startsWith('/app')) {
		if (!event.locals.user) {
			throw redirect(303, '/auth/login');
		}
	}

	return await resolve(event);
};
