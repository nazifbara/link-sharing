<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import type { ActionData, PageData } from './$types';
	import { Email, Password } from '$lib/components/icons';
	import { Label, TextField, AuthShell } from '$lib/components';

	export let data: PageData;
	export let form: ActionData;
	const { form: sForm, errors, constraints } = superForm(data.form);
	const apiError = form?.apiError;
</script>

<AuthShell>
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
				<Email />
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
				<Password />
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
				<li>Something went wrong. Please try again.</li>
			{/if}

			{#if $errors._errors}
				{#each $errors._errors as error}
					<li>{error}</li>
				{/each}
			{/if}
		</ul>
	{/if}

	<button class="btn variant-primary">Login</button>

	<p>Don't have an account? <a class="link" href="/auth/sign-up">Create account</a></p>
</AuthShell>
