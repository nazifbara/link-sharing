<script lang="ts">
	import { icons } from './utils/contants';
	import type { IconName } from './utils/types';

	export let name: IconName;
</script>

{@html icons[name]}
