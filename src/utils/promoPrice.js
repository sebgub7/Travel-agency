export const promoPrice = (price, promo) => {
  let totalValue = 0;
  const numPrice =
    (typeof price === 'string')
      ? Number(price.replace(/[&\\#,+()$~%.'":*?<>{}]/g, ''))
      : price;
  const numDiscount =
    (typeof promo === 'string')
      ? (promo.replace(/[\\%]/g, ''),
      parseFloat(promo.replace(/[\\,]/g, '.')))
      : promo;

  if (!price || !promo) {
    return null;
  } else if (isNaN(numPrice) || isNaN(numDiscount)) {
    return null;
  } else if (numDiscount > 100) {
    return null;
  }

  const percent = numDiscount / 100;
  totalValue = numPrice - numPrice * percent;

  return Number(totalValue.toFixed(2));
};