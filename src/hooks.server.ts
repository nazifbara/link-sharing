import { redirect, type Handle } from '@sveltejs/kit';

import { authenticateUser } from '$lib/utils/adminClient';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);

	if (event.url.pathname === '/') {
		throw redirect(303, '/app');
	}

	if (!event.locals.user) {
		if (event.url.pathname.startsWith('/app')) {
			throw redirect(303, '/auth/login');
		}
	} else {
		if (event.url.pathname.startsWith('/auth/sign-up')) {
			throw redirect(303, '/app');
		}
	}

	return await resolve(event);
};
