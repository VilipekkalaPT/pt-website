// Landing Page Variables
export const BANNER = "landingPage_banner";

// Pricing Page Variables
export const CURRENCY = "€";
export enum PACKAGE_TYPE {
  ALL = "all",
  SOLO = "solo",
  DUO = "duo",
  COMBO = "combo",
}
export enum SORT_TYPE {
  PRICE_ASC = "price-asc",
  PRICE_DESC = "price-desc",
}
export const PACKAGE_TYPE_NAMES: Record<PACKAGE_TYPE, string> = {
  [PACKAGE_TYPE.ALL]: "All",
  [PACKAGE_TYPE.SOLO]: "Solo package",
  [PACKAGE_TYPE.DUO]: "Duo package",
  [PACKAGE_TYPE.COMBO]: "Combo package",
};
