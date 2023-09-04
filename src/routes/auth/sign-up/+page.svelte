<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import { navigating } from '$app/stores';
	import type { ActionData, PageData } from './$types';
	import { Icon } from '$lib/components';
	import { Label, TextField, AuthShell } from '$lib/components';

	export let data: PageData;
	export let form: ActionData;

	let registering = false;
	const {
		form: sForm,
		errors,
		constraints,
		enhance
	} = superForm(data.form, {
		onSubmit: () => (registering = true),
		onResult: () => (registering = false)
	});

	$: apiError = form?.apiError;
</script>

<AuthShell {enhance}>
	<svelte:fragment slot="heading">Create account</svelte:fragment>
	<svelte:fragment slot="description">Let's get you started sharing your links!</svelte:fragment>

	<Label label="Email address">
		<TextField
			name="email"
			placeholder="e.g. alex@email.com"
			variant={$errors.email && 'error'}
			bind:value={$sForm.email}
			{...$constraints.email}
		>
			<svelte:fragment slot="icon">
				<Icon name="Email" />
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
			bind:value={$sForm.password}
			{...$constraints.password}
		>
			<svelte:fragment slot="icon">
				<Icon name="Password" />
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
			bind:value={$sForm.confirmPassword}
			{...$constraints.confirmPassword}
		>
			<svelte:fragment slot="icon">
				<Icon name="Password" />
			</svelte:fragment>

			<span slot="error">
				{#if $errors.confirmPassword}
					{$errors.confirmPassword[0]}
				{/if}
			</span>
		</TextField>
	</Label>

	{#if $errors._errors || apiError}
		<ul class="text-danger">
			{#if apiError}
				<li>{apiError}</li>
			{/if}

			{#if $errors._errors}
				{#each $errors._errors as error}
					<li>{error}</li>
				{/each}
			{/if}
		</ul>
	{/if}

	<button disabled={registering} class="btn variant-primary">
		{registering || $navigating ? 'Registering...' : 'Create new account'}
	</button>

	<p>Already have an account? <a class="link" href="/auth/login">Login</a></p>
</AuthShell>
