<script lang="ts">
	export let label: string;
	export let variant: 'base' | 'error' = 'base';
	export let horizontal = false;

	const labelClass = horizontal ? 'md:grid md:grid-cols-[1fr_2fr] md:items-center' : '';
</script>

<label class={labelClass}>
	<div
		class:text-contrast-dark={variant === 'base' && !horizontal}
		class:text-danger={variant === 'error'}
		class:mb-1={!horizontal}
		class:body-s={!horizontal}
	>
		{label}
	</div>
	<slot />
</label>
