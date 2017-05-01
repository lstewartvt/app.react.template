export const location = {
  updateQueryString: (newQuery) => {

    let curQuery = utils.convert.fromQueryString();
    ReactRouter.browserHistory.push({
      search: '?' + utils.convert.toQueryString({
        ...curQuery,
        ...newQuery
      })
    });
  }
};
