<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	import { Icon } from '$lib/components';
	import type { IconName, Link } from '$lib/utils/types';

	export let links: Link[] = [];

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

	const toIconName = (name: string) => name as IconName;
</script>

<div class="lg:grid lg:gap-6 lg:grid-cols-[2fr_3fr]">
	<section class="card hidden lg:grid place-content-center h-[700px] sticky top-6">
		<div class="relative">
			<img alt="" src="/assets/illustration-phone-mockup.svg" />
			<ul
				class="absolute grid gap-5 bg-white left-[11%] right-[11%] top-[44%] overflow-y-scroll"
				style:max-height="calc(5 * (44px + 20px))"
			>
				{#each links as link (`mockup-${link.id}`)}
					<li in:fly={{ x: 300 }} animate:flip={{ duration: 300 }}>
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
		<h1 class="heading-m mb-2">
			<slot name="heading" />
		</h1>
		<p class="mb-10">
			<slot name="description" />
		</p>

		<slot />
	</section>
</div>
