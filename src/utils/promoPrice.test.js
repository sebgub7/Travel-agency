import { promoPrice } from '../utils/promoPrice';

describe('Function promoPrice', () => {
  it('should return null when called with no arg', () => {
    expect(promoPrice()).toBe(null);
    expect(promoPrice(0)).toBe(null);
    expect(promoPrice('')).toBe(null);
    expect(promoPrice('', '')).toBe(null);
    expect(promoPrice(0, '')).toBe(null);
    expect(promoPrice('', 0)).toBe(null);
    expect(promoPrice('$51,380.61', 'three')).toBe(null);
    expect(promoPrice('two', '50')).toBe(null);
    expect(promoPrice('nine', 50)).toBe(null);
    expect(promoPrice(null, null)).toBe(null);
  });

  it('should return correct value', () => {
    expect(promoPrice('$51,380.61', 50)).toEqual(2569030.5);
    expect(promoPrice('$139,398.25', 50)).toEqual(6969912.5);
    expect(promoPrice('$51,380.61', '50%')).toEqual(2569030.5);
    expect(promoPrice('$51,380.61', '50.30%')).toEqual(2553616.32);
    expect(promoPrice('$9,552.96', '50%')).toEqual(477648);
  });
});