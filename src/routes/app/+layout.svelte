<script lang="ts">
	import { page } from '$app/stores';

	import {
		LogoSmall,
		LogoLarge,
		LinksHeader,
		ProfileDetailsHeader,
		PreviewHeader
	} from '$lib/components/icons';
</script>

<nav class="md:p-6">
	<div
		class="flex items-center justify-between bg-surface mb-4 py-4 px-6 md:mb-0 md:container md:rounded-xl"
	>
		<a href="/" aria-label="Home" class="inline-block md:hidden"><LogoSmall /></a>
		<a href="/" aria-label="Home" class="hidden md:inline-block"><LogoLarge /></a>

		<div class="flex items-center">
			{#each [{ label: 'Links', path: '/app', icon: LinksHeader }, { label: 'Profile Details', path: '/app/profile', icon: ProfileDetailsHeader }] as { label, path, icon }}
				<a
					href={path}
					aria-label={label}
					class:[&_svg_path:first-child]:fill-primary-base={$page.url.pathname === path}
					class:bg-primary-light={$page.url.pathname === path}
					class="rounded-lg px-7 py-3 flex gap-2 items-center [&:hover>span]:text-primary-base [&:hover_svg_path:first-child]:fill-primary-base"
				>
					<svelte:component this={icon} />
					<span
						class:text-primary-base={$page.url.pathname === path}
						class="hidden font-bold md:inline">{label}</span
					>
				</a>
			{/each}
		</div>

		<a href="/" aria-label="Preview" class="btn variant-secondary">
			<span class="inline md:hidden"><PreviewHeader /></span>
			<span class="hidden md:inline">Preview</span>
		</a>
	</div>
</nav>

<main class="container">
	<slot />
</main>
