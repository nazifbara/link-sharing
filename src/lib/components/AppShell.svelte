<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly, scale } from 'svelte/transition';

	import { Avatar, PlatformLink } from '$lib/components';
	import type { Link } from '$lib/utils/types';
	import { getInitials } from '$lib/utils/helpers';

	export let links: Link[] = [];
	export let photoURL: string | null;
	export let profileDetails: { firstName: string; lastName: string; email: string };

	$: initials = getInitials(profileDetails);
</script>

<div class="lg:grid lg:gap-6 lg:grid-cols-[2fr_3fr]">
	<section class="card hidden lg:grid place-content-center h-[700px] sticky top-6">
		<div class="relative">
			<img alt="" src="/assets/illustration-phone-mockup.svg" />

			{#if photoURL || initials}
				{#key photoURL}
					<div transition:scale class="absolute translate-x-1/2 right-[50%] top-[10%]">
						<Avatar src={photoURL} {initials} />
					</div>
				{/key}
			{/if}

			<div class="bg-white absolute text-center top-[28%] left-[5%] right-[5%]">
				<div class="text-contrast-dark font-bold text-lg">
					{profileDetails.firstName}
					{profileDetails.lastName}
				</div>
				<div>{profileDetails.email}</div>
			</div>
			<ul
				class="absolute grid gap-5 bg-white left-[11%] right-[11%] top-[44%] overflow-y-scroll"
				style:max-height="calc(5 * (44px + 20px))"
			>
				{#each links as link (`mockup-${link.id}`)}
					<li in:fly={{ x: 300 }} animate:flip={{ duration: 300 }}>
						<PlatformLink onMockup href={link.url} platform={link.platform} />
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
