<script lang="ts">
	import { onMount } from 'svelte';
	import Sortable from 'sortablejs';
	import { superForm } from 'sveltekit-superforms/client';

	import { Label, TextField, PlatformField, Icon } from '$lib/components';
	import type { PageData } from './$types';
	import type { IconName } from '$lib/utils/types';

	export let data: PageData;

	const { form: sForm } = superForm(data.form, { dataType: 'json' });

	const platormColorsMap: Record<string, string> = {
		GitHub: '#1A1A1A',
		'Frontend Mentor': 'FFFFFF',
		Twitter: '#43B7E9',
		LinkedIn: '#2D68FF',
		YouTube: '#EE3939',
		Facebook: '#2442AC',
		Twitch: '#EE3FC8',
		'Dev.to': '#333333',
		Codewars: '#8A1A50',
		FreeCodeCamp: '#302267',
		GitLab: '#EB4925',
		Hashnode: '#0330D1',
		StackOverflow: '#EC7100'
	};

	function dnd(node: HTMLElement) {
		Sortable.create(node, {
			animation: 150,
			handle: '.handle',
			ghostClass: 'sortable-ghost',
			onEnd: ({ oldIndex, newIndex, item }) => {
				item.classList.remove('shadow-base');

				if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
					sForm.update((value) => {
						[value.links[oldIndex], value.links[newIndex]] = [
							value.links[newIndex],
							value.links[oldIndex]
						];
						return { ...value };
					});
				}
			}
		});
	}

	const toIconName = (name: string) => name as IconName;

	function addNewLink() {
		$sForm.links = [
			...$sForm.links,
			{ id: `linkid-${$sForm.links.length}`, platform: 'Link', url: '' }
		];
	}

	function removeLink(index: number) {
		$sForm.links = [...$sForm.links.slice(0, index), ...$sForm.links.slice(index + 1)];
	}
</script>

<div class="lg:grid lg:gap-6 lg:grid-cols-[2fr_3fr]">
	<section class="card hidden lg:grid place-content-center h-[700px] sticky top-6">
		<div class="relative">
			<img alt="" src="/assets/illustration-phone-mockup.svg" />
			<ul
				class="absolute grid gap-5 bg-white left-[11%] right-[11%] top-[44%] overflow-y-scroll"
				style:max-height="calc(5 * (44px + 20px))"
			>
				{#each $sForm.links as link}
					<li class="">
						<a
							href={link.url}
							style:background-color={platormColorsMap[link.platform]}
							class="text-white bg-black rounded-xl h-[44px] flex items-center gap-2 justify-between [&_svg_path:first-child]:fill-white p-4"
							target="_blank"
							on:click={(e) => !link.url && e.preventDefault()}
						>
							<span class="flex items-center gap-2">
								<Icon name={toIconName(link.platform)} />
								{link.platform}
							</span>

							<Icon name="ArrowRight" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="card lg:p-10">
		<h1 class="heading-m mb-2">Customize your links</h1>
		<p class="mb-10">
			Add/edit/remove links below and then share all your profiles with the world!
		</p>

		<button class="btn variant-secondary w-full mb-6" on:click={addNewLink}>+ Add new Link</button>

		{#if $sForm.links[0]}
			<form method="post" class="grid gap-6" use:dnd>
				{#each $sForm.links as link, i (link.id)}
					<div class="card variant-inner">
						<div class="flex items-center justify-between">
							<button type="button" class="flex gap-2 items-center cursor-grab font-bold handle">
								<Icon name="DragAndDrop" />
								{`Link ${i + 1}`}
							</button>
							<button type="button" on:click={() => removeLink(i)}> Remove </button>
						</div>
						<PlatformField bind:value={$sForm.links[i].platform} name={`link-${i}-platform`} />

						<Label label="Link">
							<TextField
								bind:value={$sForm.links[i].url}
								placeholder={$sForm.links[i].platform && `${$sForm.links[i].platform} profile URL`}
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
	˚
</div>

<style lang="postcss">
	:global(.sortable-ghost) {
		@apply border border-primary-base;
	}
</style>
