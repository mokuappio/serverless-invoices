export function formatCurrency(val, digits = 2) {
  if (val !== null) {
    const x = parseFloat(val);
    if (Number.isNaN(x)) {
      return '';
    }
    const parts = x.toFixed(digits).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
}
