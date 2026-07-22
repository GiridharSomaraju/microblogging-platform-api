const paginationMetadata = (page, limit, totalItems) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasePreviousPage: page > 1,
  };
};

module.exports = { paginationMetadata };
