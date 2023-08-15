<script lang="ts">
	export let label: string;
	export let variant: 'base' | 'error' = 'base';
</script>

<label>
	<div
		class:text-contrast-dark={variant === 'base'}
		class:text-danger={variant === 'error'}
		class="mb-1 body-s"
	>
		{label}
	</div>
	<slot />
</label>
