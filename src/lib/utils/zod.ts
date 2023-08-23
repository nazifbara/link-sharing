import { z } from 'zod';

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
			z.object({
				id: z.string().min(1),
				platform: z.string().min(1),
				url: z.string().url().min(1)
			})
		)
		.default([
			{ id: 'linkid-0', platform: 'GitHub', url: 'https://github.com/nazifbara' },
			{ id: 'linkid-1', platform: 'YouTube', url: 'https://www.youtube.com/@TheMinimalistsPodcast' }
		])
});
