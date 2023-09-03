<script lang="ts">
	import '../app.css';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { createToaster, melt } from '@melt-ui/svelte';

	import { Icon } from '$lib/components';

	const {
		elements: { content, description },
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<string>();

	function showToast(message: string = 'Your changes have been successfully saved!') {
		addToast({ data: message });
	}

	setContext('toast', {
		showToast
	});
</script>

<slot />

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
