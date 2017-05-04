export const API_URL = process.env.API_URL || '';

export function* handleErrors(error) {

  if (!error.response) {
    return utils.log.error(error);
  }

  const response = error.response;
  utils.log.debug(response);

  if (response.status === 401 || response.status === 403) {
    ReactRouter.browserHistory.push(config.app.nav.restricted);
    throw new Error(reponse.data);
  }

  return response.data;
};
