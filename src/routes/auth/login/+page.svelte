<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import { navigating } from '$app/stores';
	import type { ActionData, PageData } from './$types';
	import { Icon } from '$lib/components';
	import { Label, TextField, AuthShell } from '$lib/components';

	export let data: PageData;
	export let form: ActionData;

	let logging = false;

	const {
		form: sForm,
		errors,
		constraints,
		enhance
	} = superForm(data.form, {
		onSubmit: () => (logging = true),
		onResult: () => (logging = false)
	});

	$: apiError = form?.apiError;
</script>

<AuthShell {enhance}>
	<svelte:fragment slot="heading">Login</svelte:fragment>
	<svelte:fragment slot="description"
		>Add your details below and get back into the app</svelte:fragment
	>

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

	<Label label="Password">
		<TextField
			name="password"
			type="password"
			placeholder="Enter your password"
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

	<button disabled={logging} class="btn variant-primary"
		>{logging || ($navigating && logging) ? 'Logging...' : 'Login'}</button
	>

	<p>Don't have an account? <a class="link" href="/auth/sign-up">Create account</a></p>
</AuthShell>
