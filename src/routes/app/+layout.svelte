<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '$lib/components';
	import type { IconName } from '$lib/utils/types';
	import type { PageData } from './$types';

	export let data: PageData;

	const navLinks: { label: string; path: string; iconName: IconName }[] = [
		{ label: 'Links', path: '/app', iconName: 'LinksHeader' },
		{ label: 'Profile Details', path: '/app/profile', iconName: 'ProfileDetailsHeader' }
	];
</script>

<nav class="md:p-6">
	<div
		class="flex items-center justify-between bg-surface mb-4 py-4 px-6 md:mb-0 md:container md:rounded-xl"
	>
		<a href="/" aria-label="Home" class="inline-block md:hidden"><Icon name="LogoSmall" /></a>
		<a href="/" aria-label="Home" class="hidden md:inline-block"><Icon name="LogoLarge" /></a>

		<div class="flex items-center">
			{#each navLinks as { label, path, iconName }}
				<a
					href={path}
					aria-label={label}
					class:[&_svg_path:first-child]:fill-primary-base={$page.url.pathname === path}
					class:bg-primary-light={$page.url.pathname === path}
					class="rounded-lg px-5 py-3 flex gap-2 items-center [&:hover>span]:text-primary-base [&:hover_svg_path:first-child]:fill-primary-base"
				>
					<Icon name={iconName} />
					<span
						class:text-primary-base={$page.url.pathname === path}
						class="hidden font-bold md:inline">{label}</span
					>
				</a>
			{/each}
		</div>

		<div class="flex gap-4 items-center">
			<a href="/{data.profile?.userUID}" aria-label="Preview" class="btn variant-secondary">
				<span class="inline md:hidden"><Icon name="PreviewHeader" /></span>
				<span class="hidden md:inline">Preview</span>
			</a>
			<a href="/auth/logout" class="text-danger text-sm font-bold">Logout</a>
		</div>
	</div>
</nav>

<main class="container pb-6">
	<slot />
</main>
