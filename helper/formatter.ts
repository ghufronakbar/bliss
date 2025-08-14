export function convertToTitleCase(input: string): string {
  return input
    .toLowerCase() // Ubah semua huruf ke huruf kecil
    .split("_") // Pisahkan berdasarkan underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi huruf pertama tiap kata
    .join(" "); // Gabungkan kembali dengan spasi
}

export const convertToIDR = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
};