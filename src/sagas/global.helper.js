export const API_URL = process.env.API_URL || '';

export function* handleErrors(error) {

  if (!error.response) {
    throw new Error(error);
  }

  const response = error.response;
  utils.log.debug(response);

  if (response.status === 401 || response.status === 403) {
    ReactRouter.browserHistory.push(app_data.nav.restricted);
    throw new Error(reponse.data);
  }

  return response.data;
};
