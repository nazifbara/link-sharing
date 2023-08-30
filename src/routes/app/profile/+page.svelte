<script lang="ts">
	import { AppShell, Icon, TextField } from '$lib/components';
	import Label from '$lib/components/Label.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AppShell links={data.profile?.links}>
	<svelte:fragment slot="heading">Profile Details</svelte:fragment>
	<svelte:fragment slot="description">
		Add your details to create a personal touch to your profile
	</svelte:fragment>

	<form method="POST">
		<div class="card variant-inner mb-6 grid md:grid-cols-3 md:items-center md:gap-3">
			<h2 class="mb-4 md:mb-0">Profile picture</h2>
			<label
				class="grid place-content-center w-full max-w-[193px] aspect-square bg-primary-light cursor-pointer rounded-xl mb-6 md:mb-0"
			>
				<input type="file" hidden accept="image/png, image/jpeg" />
				<div class="grid items-center justify-items-center">
					<Icon name="UploadImage" />
					<span class="heading-s text-primary-base">+ Upload Image</span>
				</div>
			</label>

			<p>Image must be below 1024x1024px. Use PNG or JPG format</p>
		</div>

		<div class="card variant-inner grid gap-3">
			<Label horizontal label="First name*">
				<TextField name="firstName" placeholder="e.g. John" />
			</Label>

			<Label horizontal label="Last name*">
				<TextField name="lastName" placeholder="e.g. Appleseed" />
			</Label>

			<Label horizontal label="Email*">
				<TextField name="email" placeholder="e.g. email@example.com" />
			</Label>
		</div>

		<hr
			class="mt-6 mb-4 w-[calc(100%_+_48px)] translate-x-[-24px] border-border md:mt-10 md:mb-6 lg:w-[calc(100%_+_80px)] lg:translate-x-[-40px]"
		/>

		<button class="btn variant-primary block w-full md:w-[91px] md:ml-auto">Save</button>
	</form>
</AppShell>
