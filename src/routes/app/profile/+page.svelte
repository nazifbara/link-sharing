<script lang="ts">
	import { getContext } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { invalidate } from '$app/navigation';
	import { uploadPhoto, getPhotoURL, updateProfile, deletePhoto } from '$lib/utils/client';
	import { AppShell, Icon, TextField } from '$lib/components';
	import Label from '$lib/components/Label.svelte';
	import type { PageData, ActionData } from './$types';
	import type { Profile } from '$lib/utils/types';

	export let data: PageData;
	export let form: ActionData;

	const profile = data.profile as Profile;
	let imageError: string | undefined;
	let imagePreviewURL: string | null = data.photoURL;
	let uploading = false;
	let saving = false;

	$: apiError = form?.apiError;

	const showToast = getContext<{ showToast: () => void }>('toast').showToast;

	const {
		form: sform,
		errors,
		constraints,
		enhance,
		tainted
	} = superForm(data.form, {
		onSubmit: () => (saving = true),
		onResult: ({ result }) => {
			saving = false;

			if (result.type === 'success') {
				showToast();
			}
		}
	});

	function handleImage(e: any) {
		uploading = false;
		imageError = undefined;
		const image = new Image();
		const file = e.target.files[0];

		image.src = URL.createObjectURL(file);
		image.onload = async function () {
			if (image.width * image.height >= 1024 * 1024) {
				imageError = 'This image exceed 1024x1024px. Please select another image.';
				return;
			}

			imagePreviewURL = image.src;
			uploading = true;

			try {
				const { ref } = await uploadPhoto(file);
				await getPhotoURL(ref.fullPath);
				await updateProfile(data.profile!.userUID, { photoPath: ref.fullPath });
				await deletePhoto(data.profile as Profile);
				invalidate('data:profile');
			} catch (error) {
				imageError = 'Unable to upload the image. Please try again.';
			}
			uploading = false;
		};
	}
</script>

<AppShell links={profile?.links} photoURL={imagePreviewURL} profileDetails={$sform}>
	<svelte:fragment slot="heading">Profile Details</svelte:fragment>
	<svelte:fragment slot="description">
		Add your details to create a personal touch to your profile
	</svelte:fragment>

	<form use:enhance method="POST">
		<div class="card variant-inner mb-6 grid md:grid-cols-3 md:items-center md:gap-3">
			<h2 class="mb-4 md:mb-0">Profile picture</h2>
			<label
				style:background-image="url({imagePreviewURL ?? ''})"
				class="relative overflow-hidden grid place-content-center w-full max-w-[193px] bg-cover bg-center aspect-square bg-primary-light cursor-pointer rounded-xl mb-6 md:mb-0"
			>
				<input
					on:input={handleImage}
					type="file"
					hidden
					accept="image/png, image/jpeg"
					disabled={uploading}
				/>
				<div
					class:[&_svg_path]:fill-white={imagePreviewURL}
					class="grid items-center justify-items-center z-20"
				>
					<Icon name="UploadImage" />
					<span class:text-white={imagePreviewURL} class="heading-s text-primary-base">
						{#if uploading}
							Uploading...
						{:else if imagePreviewURL}
							Change Image
						{:else}
							+ Upload Image
						{/if}
					</span>
				</div>

				{#if imagePreviewURL}
					<div class="absolute inset-0 bg-black/50 z-10" />
				{/if}
			</label>

			{#if imageError}
				<p class="text-danger">{imageError}</p>
			{:else}
				<p>Image must be below 1024x1024px. Use PNG or JPG format</p>
			{/if}
		</div>

		<div class="card variant-inner grid gap-3">
			<Label horizontal label="First name*">
				<TextField
					name="firstName"
					placeholder="e.g. John"
					variant={$errors.firstName && 'error'}
					bind:value={$sform.firstName}
					{...$constraints.firstName}
				>
					<span slot="error">
						{#if $errors.firstName}
							{$errors.firstName[0]}
						{/if}
					</span>
				</TextField>
			</Label>

			<Label horizontal label="Last name*">
				<TextField
					name="lastName"
					placeholder="e.g. Appleseed"
					variant={$errors.lastName && 'error'}
					bind:value={$sform.lastName}
					{...$constraints.lastName}
				>
					<span slot="error">
						{#if $errors.lastName}
							{$errors.lastName[0]}
						{/if}
					</span>
				</TextField>
			</Label>

			<Label horizontal label="Email*">
				<TextField
					name="email"
					placeholder="e.g. email@example.com"
					variant={$errors.email && 'error'}
					bind:value={$sform.email}
					{...$constraints.email}
				>
					<span slot="error">
						{#if $errors.email}
							{$errors.email[0]}
						{/if}
					</span>
				</TextField>
			</Label>
		</div>

		<hr
			class="mt-6 mb-4 w-[calc(100%_+_48px)] translate-x-[-24px] border-border md:mt-10 md:mb-6 lg:w-[calc(100%_+_80px)] lg:translate-x-[-40px]"
		/>

		{#if apiError}
			<span class="text-danger">{apiError}</span>
		{/if}

		<button
			disabled={saving || !!!$tainted}
			class="btn variant-primary block w-full md:w-[91px] md:ml-auto"
			>{saving ? 'Saving...' : 'Save'}</button
		>
	</form>
</AppShell>
