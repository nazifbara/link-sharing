<script lang="ts">
	export let src: string | null = null;
	export let alt: string = '';
	export let initials: string = '';
	export let size: number = 92;
</script>

<div
	style:width={`${size}px`}
	class="bg-primary-base text-white grid place-content-center aspect-square rounded-full border-4 border-primary-base overflow-hidden"
>
	{#if !src && initials}
		<span class="font-bold">{initials}</span>
	{:else if src}
		<img {src} {alt} />
	{/if}
</div>
