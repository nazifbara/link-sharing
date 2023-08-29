<script lang="ts">
	import Sortable from 'sortablejs';
	import { superForm } from 'sveltekit-superforms/client';
	import { v4 as uuid } from 'uuid';

	import { Label, TextField, PlatformField, Icon } from '$lib/components';
	import type { ActionData, PageData } from './$types';
	import type { IconName } from '$lib/utils/types';

	export let data: PageData;
	export let form: ActionData;

	const profile = data.profile;

	let saving = false;

	$: apiError = form?.apiError;

	const {
		form: sform,
		errors,
		enhance
	} = superForm(data.form, {
		dataType: 'json',
		onSubmit: () => (saving = true),
		onResult: () => (saving = false)
	});

	const platormColorsMap: Record<string, string> = {
		GitHub: '#1A1A1A',
		'Frontend Mentor': '#3E54A3',
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
					sform.update((value) => {
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
		$sform.links = [...$sform.links, { id: uuid(), platform: 'Link', url: '' }];
	}

	function removeLink(index: number) {
		$sform.links = [...$sform.links.slice(0, index), ...$sform.links.slice(index + 1)];
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
				{#each $sform.links as link}
					<li>
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

		{#if $sform.links[0]}
			<form method="POST" use:enhance class="grid gap-6" use:dnd>
				{#each $sform.links as link, i (link.id)}
					<div class="card variant-inner grid gap-3">
						<div class="flex items-center justify-between">
							<button type="button" class="flex gap-2 items-center cursor-grab font-bold handle">
								<Icon name="DragAndDrop" />
								{`Link ${i + 1}`}
							</button>
							<button type="button" on:click={() => removeLink(i)}> Remove </button>
						</div>
						<PlatformField bind:value={$sform.links[i].platform} name={`link-${i}-platform`} />

						<Label label="Link">
							<TextField
								bind:value={$sform.links[i].url}
								placeholder={$sform.links[i].platform && `${$sform.links[i].platform} profile URL`}
								name={`link-${i}-url`}
								variant={$errors.links && $errors.links[i] && 'error'}
							>
								<svelte:fragment slot="icon">
									<Icon name="Link" />
								</svelte:fragment>

								<span slot="error">
									{#if $errors.links && $errors.links[i]}
										{$errors.links[i]}
									{/if}
								</span>
							</TextField>
						</Label>
					</div>
				{/each}

				<hr
					class="mt-6 mb-4 w-[calc(100%_+_48px)] translate-x-[-24px] border-border md:mt-10 md:mb-6 lg:w-[calc(100%_+_80px)] lg:translate-x-[-40px]"
				/>

				{#if apiError}
					<span class="text-danger">{apiError}</span>
				{/if}

				<button disabled={saving} class="btn variant-primary block w-full md:w-[initial] md:ml-auto"
					>{saving ? 'Saving...' : 'Save'}</button
				>
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
	</section>
	˚
</div>

<style lang="postcss">
	:global(.sortable-ghost) {
		@apply border border-primary-base;
	}
</style>
