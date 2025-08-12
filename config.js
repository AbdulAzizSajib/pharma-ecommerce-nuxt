export const apiBasePharma =
  "https://webapps.acibd.com/api/pharma-ecommerce-app-stagging/api";
export const imgBasePharma =
  "https://webapps.acibd.com/api/barguna-pharma-app-stagging/storage";

export function formatNumber(number) {
  const isInteger = Number.isInteger(number);

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  }).format(number);
}

export const getTokenConfig = () => {
  const token = localStorage.getItem("token" || "");

  return { headers: { Authorization: `Bearer ${token}` } };
};
