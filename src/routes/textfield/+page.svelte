<script lang="ts">
	import { TextField, icons, Label, PlatformField } from '$lib/components';
</script>

<div class="grid gap-6 p-6">
	<TextField placeholder="placeholder..." />

	<TextField variant="error" placeholder="placeholder...">
		<span slot="error">Can't be empty</span>
	</TextField>

	<TextField placeholder="Placeholder...">
		<svelte:fragment slot="icon">
			<svelte:component this={icons.Link} />
		</svelte:fragment>
		<span slot="error">Can't be empty</span>
	</TextField>

	<Label variant="error" label="Email address">
		<TextField variant="error" placeholder="email...">
			<svelte:fragment slot="icon">
				<svelte:component this={icons.Link} />
			</svelte:fragment>
			<span slot="error">Can't be empty</span>
		</TextField>
	</Label>

	<PlatformField />
</div>
