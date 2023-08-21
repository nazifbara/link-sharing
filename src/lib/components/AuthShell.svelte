<script lang="ts">
	import { Icon } from '$lib/components';

	export let enhance: (arg) => void = () => {};
</script>

<div class="grid items-start pt-8 min-h-[100svh] md:content-center container">
	<div class="grid items-center gap-14 w-full max-w-[476px] mx-auto">
		<Icon name="LogoLarge" />

		<form use:enhance method="POST" class=" rounded-xl md:p-10 md:bg-surface">
			<h1 class="heading-m mb-4">
				<slot name="heading" />
			</h1>
			<p class="mb-8"><slot name="description" /></p>

			<div class="grid gap-6">
				<slot />
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	@screen md {
		div > :global(svg) {
			@apply mx-auto;
		}
	}
</style>
