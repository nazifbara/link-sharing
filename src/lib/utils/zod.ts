import { z } from 'zod';

import { isValidURL } from '$lib/utils/helpers';

export const signUpSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, { message: 'Please check again' }),
		confirmPassword: z.string().min(8, { message: 'Please check again' })
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'The passwords did not match'
	});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: 'Required' })
});

export const linksSchema = z.object({
	links: z
		.array(
			z
				.object({
					id: z.string().min(1),
					platform: z.string().min(1),
					url: z.string().url().min(1)
				})
				.refine(({ platform, url }) => isValidURL(platform, url), {
					message: 'Please check the URL'
				})
		)
		.min(1)
});

export const profileDetailsSchema = z.object({
	firstName: z.string().default(''),
	lastName: z.string().default(''),
	email: z.string().email().default('')
});
