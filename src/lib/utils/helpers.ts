export function isValidURL(platform: string, url: string): boolean {
	const pattern = {
		GitHub: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim,
		'Frontend Mentor': /(https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_]+$/gim,
		Twitter: /(https?:\/\/)?(www\.)?twitter\.com\/@?[a-zA-Z0-9_]+$/gim,
		LinkedIn: /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_]+$/gim,
		YouTube: /(https?:\/\/)?(www\.)?youtube\.com\/@[a-zA-Z0-9_]+$/gim,
		Facebook: /(https?:\/\/)?(www\.|web\.)?facebook\.com\/profile.php?id=[0-9]+/gim,
		Twitch: /(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_]+$/gim,
		'Dev.to': /(https?:\/\/)?(www\.)?dev\.to\/[a-zA-Z0-9_]+$/gim,
		Codewars: /(https?:\/\/)?(www\.)?codewars\.com\/users\/[a-zA-Z0-9_]+$/gim,
		FreeCodeCamp: /(https?:\/\/)?(www\.)?freecodecamp\.org\/[a-zA-Z0-9_]+$/gim,
		GitLab: /(https?:\/\/)?(www\.)?gitlab\.com\/[a-zA-Z0-9_]+$/gim,
		Hashnode:
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gim,
		StackOverflow: /(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/[0-9]+\/[a-zA-Z0-9_]+$/gim
	}[platform];

	if (!pattern) return false;

	return pattern.test(url);
}
