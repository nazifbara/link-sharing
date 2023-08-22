<script lang="ts">
	import Sortable from 'sortablejs';

	import { Label, TextField, PlatformField, Icon } from '$lib/components';
	import type { IconName } from '$lib/utils/types';

	let links: { id: string; platform: IconName; url: string }[] = [];

	function dnd(node: HTMLElement) {
		Sortable.create(node, {
			animation: 150,
			handle: '.handle',
			ghostClass: 'sortable-ghost',
			onEnd: ({ oldIndex, newIndex, item }) => {
				item.classList.remove('shadow-base');

				if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
					[links[oldIndex], links[newIndex]] = [links[newIndex], links[oldIndex]];
				}
			}
		});
	}

	function addNewLink() {
		links = [...links, { id: `linkId-${links.length}`, platform: 'Link', url: '' }];
	}

	function removeLink(index: number) {
		links = [...links.slice(0, index), ...links.slice(index + 1)];
	}
</script>

<div class="lg:grid lg:gap-6 lg:grid-cols-[2fr_3fr]">
	<section class="card hidden lg:grid place-content-center h-[700px] sticky top-6">
		<img alt="" src="/assets/illustration-phone-mockup.svg" />
	</section>

	<section class="card lg:p-10">
		<h1 class="heading-m mb-2">Customize your links</h1>
		<p class="mb-10">
			Add/edit/remove links below and then share all your profiles with the world!
		</p>

		<button class="btn variant-secondary w-full mb-6" on:click={addNewLink}>+ Add new Link</button>

		{#if links[0]}
			<form method="post" class="grid gap-6" use:dnd>
				{#each links as link, i (link.id)}
					<div class="card variant-inner">
						<div class="flex items-center justify-between">
							<button type="button" class="flex gap-2 items-center cursor-grab font-bold handle">
								<Icon name="DragAndDrop" />
								{`Link ${i + 1}`}
							</button>
							<button type="button" on:click={() => removeLink(i)}> Remove </button>
						</div>
						<PlatformField bind:value={link.platform} name={`link-${i}-platform`} />

						<Label label="Link">
							<TextField
								bind:value={link.url}
								placeholder={link.platform && `${link.platform} profile URL`}
								name={`link-${i}-url`}
							>
								<svelte:fragment slot="icon">
									<Icon name="Link" />
								</svelte:fragment>
							</TextField>
						</Label>
					</div>
				{/each}
			</form>
		{:else}
			<div class="card variant-inner">
				<div class="py-6 max-w-md mx-auto text-center">
					<img alt="" src="/assets/illustration-empty.svg" class="mx-auto mb-6 md:mb-10" />
					<h2 class="heading-m mb-6">Let's get you started</h2>
					<p>
						Use the “Add new link” button to get started. Once you have more than one link, you can
						reorder and edit them. We're here to help you share your profiles with everyone!
					</p>
				</div>
			</div>
		{/if}

		<hr
			class="mt-6 mb-4 w-[calc(100%_+_48px)] translate-x-[-24px] border-border md:mt-10 md:mb-6 lg:w-[calc(100%_+_80px)] lg:translate-x-[-40px]"
		/>

		<button disabled class="btn variant-primary block w-full md:w-[initial] md:ml-auto">Save</button
		>
	</section>
</div>

<style lang="postcss">
	:global(.sortable-ghost) {
		@apply border border-primary-base;
	}
</style>
