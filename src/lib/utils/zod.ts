import { z } from 'zod';

export const loginSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, { message: 'Please check again' }),
		confirmPassword: z.string().min(8, { message: 'Please check again' })
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'The passwords did not match'
	});
