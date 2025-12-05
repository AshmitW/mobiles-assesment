export function formatPrice(price) {
  return '£' + price;
}

export function calculateDiscountedPrice(originalPrice, discountPercent) {
  const discount = originalPrice * (discountPercent / 100);
  return originalPrice - discount;
}

export function calculateDiscountPercentage(originalPrice, currentPrice) {
  const discount = originalPrice - currentPrice;
  return (discount / originalPrice) * 100;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
