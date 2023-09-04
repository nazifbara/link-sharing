import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('auth', { path: '/' });
	throw redirect(303, '/auth/login');
};
