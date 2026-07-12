function paginate(items, page, pageSize) {
  const safeInputPage = Number.isFinite(page) ? page : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, safeInputPage), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  return { paginatedItems, totalPages, currentPage: safePage };
}

export default paginate;
