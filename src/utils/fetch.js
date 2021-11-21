export default async function retrieveCurrencyList(api, base) {
  const resp = await fetch(`${api}?from=${base}`);
  const currencyList = await resp.json();

  return currencyList;
}