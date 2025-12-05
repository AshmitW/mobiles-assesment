export function filterByCategory(products, category) {
  if (category === 'all') return products;

  return products.filter(product => {
    return product.category == category;
  });
}

export function sortProducts(products, order) {
  return [...products].sort((a, b) => {
    if (order === 'low-high') {
      return a.price > b.price;
    } else {
      return a.price < b.price;
    }
  });
}

export function searchProducts(products, query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
}
