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
