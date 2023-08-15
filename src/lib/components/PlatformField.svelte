<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	import { icons } from '.';

	const {
		elements: { trigger, menu, option, label },
		states: { valueLabel, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true
	});

	let platformOptions = [
		{
			icon: icons.GitHub,
			label: 'GitHub'
		},
		{
			icon: icons.Youtube,
			label: 'YouTube'
		},
		{
			icon: icons.Linkedin,
			label: 'LinkedIn'
		},
		{
			icon: icons.Twitter,
			label: 'Twitter'
		},
		{
			icon: icons.Frontendmentor,
			label: 'Frontend Mentor'
		},
		{
			icon: icons.Hashnode,
			label: 'Hashnode'
		},
		{
			icon: icons.Devto,
			label: 'Dev.to'
		},
		{
			icon: icons.GitLab,
			label: 'GitLab'
		},
		{
			icon: icons.Codewars,
			label: 'Codewars'
		},
		{
			icon: icons.StackOverflow,
			label: 'StackOverflow'
		},
		{
			icon: icons.Twitch,
			label: 'Twitch'
		}
	];

	$: selectedIcon = platformOptions.find(({ label }) => label === $valueLabel)?.icon ?? icons.Link;
</script>

<div>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="block mb-1 body-s" use:melt={$label}>Platforms</label>
	<button
		class:drop-shadow-primary={$open}
		class="input w-full flex items-center justify-between"
		use:melt={$trigger}
		aria-label="Platforms"
	>
		<span class="flex gap-1 items-center">
			<svelte:component this={selectedIcon} />
			{$valueLabel || 'Select a Platform'}
		</span>
		<div class:rotate-180={$open} class="transition-transform">
			<svelte:component this={icons.ChevronDown} />
		</div>
	</button>
	{#if $open}
		<div
			class="z-10 bg-surface border border-border shadow-base px-4 rounded-lg max-h-[360px] overflow-y-auto"
			use:melt={$menu}
			transition:fly={{ y: -50 }}
		>
			<ul>
				{#each platformOptions as { icon, label }}
					<li
						use:melt={$option({ value: label, label })}
						class:text-primary-base={$isSelected(label)}
						class:[&_svg_path:first-child]:fill-primary-base={$isSelected(label)}
						class="flex gap-3 items-center py-3 border-b border-border cursor-pointer"
					>
						<svelte:component this={icon} />
						{label}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
