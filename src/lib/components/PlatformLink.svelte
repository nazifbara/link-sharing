<script lang="ts">
	import { Icon } from '$lib/components';
	import type { IconName } from '$lib/utils/types';

	export let href: string = '';
	export let platform: string = '';
	export let onMockup = false;

	const toIconName = (name: string) => name as IconName;

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
</script>

<a
	{href}
	style:background-color={platormColorsMap[platform]}
	class:h-[44px]={onMockup}
	class:py-3={!onMockup}
	class="text-white bg-black rounded-xl h-[44px] flex items-center gap-2 justify-between [&_svg_path:first-child]:fill-white p-4"
	target="_blank"
	on:click={(e) => !href && e.preventDefault()}
>
	<span class="flex items-center gap-2">
		<Icon name={toIconName(platform)} />
		{platform}
	</span>

	<Icon name="ArrowRight" />
</a>
