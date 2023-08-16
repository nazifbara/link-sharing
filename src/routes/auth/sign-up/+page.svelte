<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import type { PageData } from './$types';
	import { LogoLarge, Email, Password } from '$lib/components/icons';
	import { Label, TextField } from '$lib/components';

	export let data: PageData;

	const { form, errors, constraints } = superForm(data.form);
</script>

<div class="grid items-start pt-8 min-h-[100svh] md:content-center">
	<div class="grid items-center gap-14 w-full max-w-[476px] mx-auto">
		<LogoLarge />
		<SuperDebug data={$form} />

		<form method="POST" class=" rounded-xl md:p-10 md:bg-surface">
			<h1 class="heading-m mb-4">Create account</h1>
			<p class="mb-8">Let's get you started sharing your links!</p>

			<div class="grid gap-6">
				<Label label="Email address">
					<TextField
						name="email"
						placeholder="e.g. alex@email.com"
						variant={$errors.email && 'error'}
						bind:value={$form.email}
						{...$constraints.email}
					>
						<svelte:fragment slot="icon">
							<Email />
						</svelte:fragment>

						<span slot="error">
							{#if $errors.email}
								{$errors.email[0]}
							{/if}
						</span>
					</TextField>
				</Label>

				<Label label="Create password">
					<TextField
						name="password"
						type="password"
						placeholder="At least 8 characters"
						variant={$errors.password && 'error'}
						bind:value={$form.password}
						{...$constraints.password}
					>
						<svelte:fragment slot="icon">
							<Password />
						</svelte:fragment>

						<span slot="error">
							{#if $errors.password}
								{$errors.password[0]}
							{/if}
						</span>
					</TextField>
				</Label>

				<Label label="Confirm password">
					<TextField
						name="confirmPassword"
						type="password"
						placeholder="At least 8 characters"
						variant={$errors.confirmPassword && 'error'}
						bind:value={$form.confirmPassword}
						{...$constraints.confirmPassword}
					>
						<svelte:fragment slot="icon">
							<Password />
						</svelte:fragment>

						<span slot="error">
							{#if $errors.confirmPassword}
								{$errors.confirmPassword[0]}
							{/if}
						</span>
					</TextField>
				</Label>

				{#if $errors._errors}
					<ul class="text-danger">
						{#each $errors._errors as error}
							<li>{error}</li>
						{/each}
					</ul>
				{/if}

				<button class="btn variant-primary">Create new account</button>

				<p>Already have an account? <a class="link" href="/auth/login">Login</a></p>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	@screen md {
		div > :global(svg) {
			@apply mx-auto;
		}
	}
</style>
