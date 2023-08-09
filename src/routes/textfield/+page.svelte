<script lang="ts">
	import { TextField, Icon } from '$lib';
</script>

<div class="grid gap-6 p-6">
	<TextField placeholder="placeholder..." />

	<TextField variant="error" placeholder="placeholder...">
		<span slot="error">Can't be empty</span>
	</TextField>

	<TextField placeholder="placeholder...">
		<svelte:fragment slot="icon">
			<Icon name="link-header" />
		</svelte:fragment>
		<span slot="error">Can't be empty</span>
	</TextField>
</div>
