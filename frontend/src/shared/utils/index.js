/**
 * @param {RequestInfo} input
 * @param {RequestInit} init
 */
export const fetcher = async (input, init) => {
	const request = await fetch(input, init);
	const response = await request.json();

	if (!request.ok) {
		throw new Error(response || request.statusText);
	}

	return response;
};
