<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	import { Icon } from '$lib/components';
	import type { IconName } from '$lib/utils/types';

	export let value: string;
	export let name: string = '';

	const {
		elements: { trigger, menu, option, label },
		states: { valueLabel, open, value: selectValue },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		name
	});

	let platformOptions: IconName[] = [
		'GitHub',
		'YouTube',
		'LinkedIn',
		'Twitter',
		'Frontend Mentor',
		'Hashnode',
		'Dev.to',
		'GitLab',
		'Codewars',
		'StackOverflow',
		'Twitch'
	];

	value ? ($selectValue = value) : (value = $selectValue);

	$: value = $selectValue;
	$: selectedPlatformIconName = $valueLabel as IconName;
</script>

<div>
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label class="block mb-1 body-s" use:melt={$label}>Platforms</label>
	<button
		type="button"
		class:drop-shadow-primary={$open}
		class="input w-full flex items-center justify-between"
		use:melt={$trigger}
		aria-label="Platforms"
	>
		<span class="flex gap-1 items-center">
			<Icon name={selectedPlatformIconName ?? 'Link'} />
			{$valueLabel || 'Select a Platform'}
		</span>
		<div class:rotate-180={$open} class="transition-transform">
			<Icon name="ChevronDown" />
		</div>
	</button>
	{#if $open}
		<div
			class="z-10 bg-surface border border-border shadow-base px-4 rounded-lg max-h-[360px] overflow-y-auto"
			use:melt={$menu}
			transition:fly={{ y: -50 }}
		>
			<ul>
				{#each platformOptions as label}
					<li
						use:melt={$option({ value: label, label })}
						class:text-primary-base={$isSelected(label)}
						class:[&_svg_path:first-child]:fill-primary-base={$isSelected(label)}
						class="flex gap-3 items-center py-3 border-b border-border cursor-pointer"
					>
						<Icon name={label} />
						{label}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
