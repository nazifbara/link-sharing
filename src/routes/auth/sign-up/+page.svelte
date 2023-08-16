<script lang="ts">
	import { LogoLarge, Email, Password } from '$lib/components/icons';
	import { Label, TextField } from '$lib/components';
</script>

<div class="grid items-start pt-8 min-h-[100svh] md:content-center">
	<div class="grid items-center gap-14 w-full max-w-[476px] mx-auto">
		<LogoLarge />

		<form class=" rounded-xl md:p-10 md:bg-surface">
			<h1 class="heading-m mb-4">Create account</h1>
			<p class="mb-8">Let's get you started sharing your links!</p>

			<div class="grid gap-6">
				<Label label="Email address">
					<TextField placeholder="e.g. alex@email.com">
						<svelte:fragment slot="icon">
							<Email />
						</svelte:fragment>
					</TextField>
				</Label>

				<Label label="Create password">
					<TextField type="password" placeholder="At least 8 characters">
						<svelte:fragment slot="icon">
							<Password />
						</svelte:fragment>
					</TextField>
				</Label>

				<Label label="Confirm password">
					<TextField type="password" placeholder="At least 8 characters">
						<svelte:fragment slot="icon">
							<Password />
						</svelte:fragment>
					</TextField>
				</Label>

				<button class="btn variant-primary">Create new account</button>

				<p>Already have an account? <a class="link" href="/auth/login">Login</a></p>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	@screen md {
		div > :global(svg) {
			@apply mx-auto;
		}
	}
</style>
