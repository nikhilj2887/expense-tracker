export const categoryIcons: Record<string,string> = {
  Food: "🍔",
  Rent: "🏠",
  Travel: "✈️",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Bills: "📄",
  Groceries: "🛒",
  Fuel: "⛽",
  HealthMedical: "💊",
  Savings: "💰",
  Debt: "💳",
  Other: "📦",
  Paycheck:""
}

export function getCategoryIcon(category:string){
  return categoryIcons[category] || "📦"
}



