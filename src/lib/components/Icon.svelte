<script lang="ts">
	import type { IconName } from '$lib/utils/types';
	import { iconsMap } from './icons';

	export let name: IconName;
</script>

<svelte:component this={iconsMap[name]} />
