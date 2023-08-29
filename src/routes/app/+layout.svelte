<script lang="ts">
	import { setContext } from 'svelte';
	import { createToaster, melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	import { page } from '$app/stores';
	import { Icon } from '$lib/components';
	import type { IconName } from '$lib/utils/types';

	const {
		elements: { content, description },
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<string>();

	function showToast() {
		addToast({ data: 'Your changes have been successfully saved!' });
	}

	setContext('toast', {
		showToast
	});

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
					class="rounded-lg px-7 py-3 flex gap-2 items-center [&:hover>span]:text-primary-base [&:hover_svg_path:first-child]:fill-primary-base"
				>
					<Icon name={iconName} />
					<span
						class:text-primary-base={$page.url.pathname === path}
						class="hidden font-bold md:inline">{label}</span
					>
				</a>
			{/each}
		</div>

		<a href="/" aria-label="Preview" class="btn variant-secondary">
			<span class="inline md:hidden"><Icon name="PreviewHeader" /></span>
			<span class="hidden md:inline">Preview</span>
		</a>
	</div>
</nav>

<main class="container pb-6">
	<slot />
</main>

<div
	class="fixed translate-x-1/2 right-1/2 bottom-10 z-50 mx-auto flex flex-col items-end gap-2"
	use:portal
>
	{#each $toasts as { id, data } (id)}
		<div
			use:melt={$content(id)}
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 150, y: 80 }}
			out:fly={{ duration: 150, y: 80 }}
			class="rounded-lg bg-contrast-dark text-white shadow-base"
		>
			<div class="relative flex w-[406px] max-w-[calc(100vw-2rem)] items-center gap-2 py-4 px-6">
				<span class="drop-shadow-[2px_2px_0px_white]">
					<Icon name="ChangesSaved" />
				</span>
				<div use:melt={$description(id)}>
					{data}
				</div>
			</div>
		</div>
	{/each}
</div>
