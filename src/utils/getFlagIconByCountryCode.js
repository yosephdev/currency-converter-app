import getUnicodeFlagIcon from 'country-flag-icons/unicode'

// Simple wrapper to pass in "currency" code, then return the flag from the currency code
export default function getFlagIconByCountryCode(code) {
  if (code && code.length === 3) {
    code = code.toString().substring(0, 2).trim();
    const flag = getUnicodeFlagIcon(code.toUpperCase());
    return flag;
  }
  return '';
}