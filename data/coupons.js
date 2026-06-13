/**
 * Coupon Configuration
 * ─────────────────────────────────────────────
 * Add or edit coupons here. All pages consume
 * this file so changes reflect across the site.
 *
 * discount: 0.20 = 20%, 0.10 = 10%, etc.
 */

const coupons = [
  {
    code: 'EYECONIC20',
    discount: 0.20,          // 20% off
    label: '20% Off',
    description: 'Get 20% off on your entire order.',
  },
  {
    code: 'EYE50',
    discount: 0.50,          // 50% off
    label: '50% Off',
    description: 'Exclusive 50% off on your entire order.',
  },
  {
    code: 'FIRST10',
    discount: 0.10,          // 10% off
    label: '10% Off',
    description: 'Welcome! 10% off on your first order.',
  },
];

export default coupons;
