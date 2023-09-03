<script lang="ts">
	import { getContext, onMount } from 'svelte';

	import { Avatar, PlatformLink } from '$lib/components';
	import { getInitials } from '$lib/utils/helpers';
	import type { PageData } from './$types';

	export let data: PageData;

	const profile = data.profile;

	let currentURL = '';

	onMount(() => (currentURL = window.location.href));

	const showToast = getContext<{ showToast: (message: string) => void }>('toast').showToast;
</script>

<div class="max-h-[40dvh] md:min-h-[357px] md:bg-primary-base rounded-b-[32px] md:p-6">
	{#if data.isOwner}
		<nav class="flex justify-between py-4 px-6 md:bg-surface rounded-lg">
			<a href="/app" class="btn variant-secondary">Back to Editor</a>
			<button
				on:click={() => {
					navigator.clipboard.writeText(currentURL);
					showToast('The link has been copied to you clipboard!');
				}}
				class="btn variant-primary">Share Link</button
			>
		</nav>
	{/if}
</div>

<div class="container">
	<article
		class="mt-14 mx-auto max-w-[237px] rounded-3xl md:bg-surface md:max-w-[350px] md:py-12 md:px-14 md:mt-0 md:translate-y-[-130px]"
	>
		<div>
			{#if profile}
				<header class="grid place-content-center justify-items-center gap-6 text-center mb-12">
					<Avatar src={data.photoURL} initials={getInitials(data.profile)} size={104} />
					<div>
						<h1 class="heading-m mb-3">{`${profile?.firstName} ${profile?.lastName}`}</h1>
						<p>{profile.email}</p>
					</div>
				</header>

				<ul class="grid gap-5">
					{#each profile.links as link}
						<li>
							<PlatformLink href={link.url} platform={link.platform} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</article>
</div>
