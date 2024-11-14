import { toMoneyValue } from "@/lib/moneyFormater";

export function MoneyValue({
   value,
   currency,
   decimals,
}) {
  return <span>{toMoneyValue(value, currency, decimals)}</span>
}