import type { iconsMap } from '$lib/components/icons';

export type IconName = keyof typeof iconsMap;

export interface Link {
	id: string;
	platform: string;
	url: string;
}

export interface Profile {
	id: string;
	userUID: string;
	photoPath?: string;
	firstName: string;
	lastName: string;
	links: Link[];
}
