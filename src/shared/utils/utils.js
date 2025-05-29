// ------------------- Filter -------------------
export const filterQuote = (elems, category) => {
  const randomNum = () => {
    return Math.floor(Math.random() * elems.length);
  };

  // ------------------- Filter quote by category -------------------
  const filtered = category
    ? elems.filter((q) => q.category === category)
    : elems;

  const randomQuote = filtered[randomNum()];

  return randomQuote;
};

// ------------------- Random number for quote list -------------------
export const randomNum = (elements) => {
  return Math.floor(Math.random() * elements.length);
};

// ------------------- Format -------------------
export const formatNumber = (number, length = 2, padChar = "0") => {
  return number.toString().padStart(length, padChar);
};

// ------------------- Read localStorage with fallback -------------------
export const getLocalStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.error("Error while parsing localStorage", e);
    return fallback;
  }
};

// Tags for filtered quote fetch
export const primaryTags = [
  "random",
  "inspiration",
  "love",
  "life",
  "philosophy",
  "motivation",
  "hope",
  "courage",
  "wisdom",
  "success",
  "peace",
];
