export function formatCurrency(val, digits = 2) {
  if (val !== null) {
    let x = parseFloat(val);
    if (Number.isNaN(x)) {
      return '';
    }
    const decimalLimiter = 10 ** digits;
    x = Math.round((x + Number.EPSILON) * decimalLimiter) / decimalLimiter;
    const parts = x.toFixed(digits).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
}
