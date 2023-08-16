<script lang="ts">
	export let type: 'text' | 'email' | 'password' = 'text';
	export let value = '';
	export let name = '';
	export let placeholder = '';
	export let variant: 'error' | undefined = undefined;

	const handleInput = (e: any) => (value = e.target.value);
</script>

<div>
	<slot name="icon" />
	<input
		{...$$restProps}
		{name}
		{type}
		{value}
		{placeholder}
		on:input={handleInput}
		class:border-danger={variant === 'error'}
		class:pl-11={$$slots.icon}
		class="w-full input text-contrast-dark"
	/>
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
