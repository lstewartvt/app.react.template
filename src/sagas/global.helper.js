export const API_URL = process.env.API_URL || '';

export function* handleErrors(response) {

	if (!response.ok || response.status >= 400) {
		throw yield response.json();
	}

	return yield response.json();
};

export function logout() {
	return utils.api.request({
		endpoint: app_data.nav.account.logout
	});
};