/**
 * Transaction Classification Engine
 * Automatically classifies transactions into categories based on deterministic rules.
 */

// Category types
export type TransactionCategoryType = 
  | "FOOD"
  | "ACCOMMODATION" 
  | "TRANSPORT"
  | "SHOPPING"
  | "ENTERTAINMENT"
  | "EDUCATION"
  | "UTILITIES"
  | "AIRTIME"
  | "DATA_BUNDLES"
  | "HEALTHCARE"
  | "TRANSFERS"
  | "SAVINGS"
  | "BUSINESS"
  | "OTHER";

/**
 * Classifies a transaction based on its description and counterparty.
 * Uses deterministic rules first, then falls back to "OTHER".
 * 
 * @param description The transaction description
 * @param counterparty The counterparty/merchant name
 * @returns The classified category type
 */
export function classifyTransaction(
  description: string, 
  counterparty: string | null
): TransactionCategoryType {
  const text = `${description} ${counterparty || ""}`.toLowerCase();
  
  // Food-related keywords
  const foodKeywords = ["food", "restaurant", "hotel", "cafe", "hotel", "mcdonald", "kfc", "nairobi", "eatery", "bistro"];
  if (foodKeywords.some(kw => text.includes(kw))) {
    return "FOOD";
  }
  
  // Accommodation-related keywords
  const accommodationKeywords = ["rent", "accommodation", "house", "apartment", "room", "landlord", "real estate", "housing"];
  if (accommodationKeywords.some(kw => text.includes(kw))) {
    return "ACCOMMODATION";
  }
  
  // Transport-related keywords
  const transportKeywords = ["transport", "bus", "matatu", "train", "flight", "uber", "bolt", "taxi", "fuel", "petrol", "car", "vehicle", "mileage"];
  if (transportKeywords.some(kw => text.includes(kw))) {
    return "TRANSPORT";
  }
  
  // Shopping-related keywords
  const shoppingKeywords = ["shop", "mart", "store", "bazaar", "mall", "wholesale", "retail", "buy", "shoes", "clothing", "apparel"];
  if (shoppingKeywords.some(kw => text.includes(kw))) {
    return "SHOPPING";
  }
  
  // Entertainment-related keywords
  const entertainmentKeywords = ["cinema", "movie", "theater", "concert", "show", "gaming", "game", "sports", "stadium", "netflix", "spotify", "club", "bar"];
  if (entertainmentKeywords.some(kw => text.includes(kw))) {
    return "ENTERTAINMENT";
  }
  
  // Education-related keywords
  const educationKeywords = ["school", "university", "college", "tuition", "fees", "books", "learning", "certification", "exam"];
  if (educationKeywords.some(kw => text.includes(kw))) {
    return "EDUCATION";
  }
  
  // Utilities-related keywords
  const utilitiesKeywords = ["electricity", "water", "gas", "utility", "bill", "power", "street light"];
  if (utilitiesKeywords.some(kw => text.includes(kw))) {
    return "UTILITIES";
  }
  
  // Airtime-related keywords
  const airtimeKeywords = ["airtime", "bundles", "bundle", "recharge", "top-up", "cash", "credit"];
  if (airtimeKeywords.some(kw => text.includes(kw))) {
    return "AIRTIME";
  }
  
  // Data bundles-related keywords
  const dataKeywords = ["data", "internet", "bundle", "mb", "gb", "connection"];
  if (dataKeywords.some(kw => text.includes(kw))) {
    return "DATA_BUNDLES";
  }
  
  // Healthcare-related keywords
  const healthcareKeywords = ["hospital", "clinic", "doctor", "pharmacy", "medicine", "health", "medical", "dental"];
  if (healthcareKeywords.some(kw => text.includes(kw))) {
    return "HEALTHCARE";
  }
  
  // Transfer-related keywords
  const transferKeywords = ["transfer", "send", "receive", "mpesa", "send money", "pay bill"];
  if (transferKeywords.some(kw => text.includes(kw))) {
    return "TRANSFERS";
  }
  
  // Savings-related keywords
  const savingsKeywords = ["save", "savings", "transfer to savings"];
  if (savingsKeywords.some(kw => text.includes(kw))) {
    return "SAVINGS";
  }
  
  // Business-related keywords
  const businessKeywords = ["business", "invoice", "receipt", "payment", "profit", "loss", "revenue"];
  if (businessKeywords.some(kw => text.includes(kw))) {
    return "BUSINESS";
  }
  
  // Default to OTHER
  return "OTHER";
}

/**
 * Provides a human-readable description of a category type.
 */
export function getCategoryDescription(category: TransactionCategoryType): string {
  const descriptions: Record<TransactionCategoryType, string> = {
    "FOOD": "Food and dining expenses",
    "ACCOMMODATION": "Rent and housing costs",
    "TRANSPORT": "Transportation and travel expenses",
    "SHOPPING": "Shopping and personal items",
    "ENTERTAINMENT": "Entertainment and leisure activities",
    "EDUCATION": "Education and learning materials",
    "UTILITIES": "Utilities and household bills",
    "AIRTIME": "Airtime and phone credit",
    "DATA_BUNDLES": "Data and internet bundles",
    "HEALTHCARE": "Healthcare and medical expenses",
    "TRANSFERS": "Money transfers between accounts",
    "SAVINGS": "Savings contributions",
    "BUSINESS": "Business-related expenses",
    "OTHER": "Other expenses not categorized above",
  };
  
  return descriptions[category] || "Unknown category";
}

/**
 * Determines if a transaction is an expense or income based on the amount sign.
 * This is a helper function - the transaction type should be explicitly set.
 */
export function determineTransactionType(amount: number): "INCOME" | "EXPENSE" {
  // Positive amounts are income, negative are expenses
  // But since we use minor units (always positive), we need explicit type
  return "EXPENSE"; // Default, should be set explicitly
}

export default { classifyTransaction, getCategoryDescription, determineTransactionType };
