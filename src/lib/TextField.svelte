<script lang="ts">
	export let type: 'text' | 'email' = 'text';
	export let value = '';
	export let placeholder = '';
	export let variant: 'base' | 'error' = 'base';

	let inputClass = `w-full input${variant !== 'base' ? `-${variant}` : ''}`;
</script>

<div>
	<slot name="icon" />
	<input {type} class:pl-11={$$slots.icon} class={inputClass} {value} {placeholder} />
	{#if variant === 'error'}
		<slot name="error" />
	{/if}
</div>

<style type="postcss">
	div {
		position: relative;
	}

	input + :global(*) {
		@apply text-danger bg-surface body-s absolute right-4 top-3 bottom-3;
	}

	div > :global(svg) {
		@apply absolute left-4 top-4;
	}
</style>
