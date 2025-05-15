// ------------------- Filter -------------------
export const filterQuote = (elems, category) => {
  const randomNum = () => {
    return Math.floor(Math.random() * elems.length);
  };

  // Filter quote by category
  const filtered = category
    ? elems.filter((q) => q.category === category)
    : elems;

  const randomQuote = filtered[randomNum()];

  return randomQuote;
};

// useEffect(() => {
//   setTodos(JSON.parse(localStorage.getItem("todos-jotai")));
// }, []);

// useEffect(() => {
//   setTimeout(() => {
//     localStorage.setItem("todos-jotai", JSON.stringify(todos));
//   }, 100);
// }, [todos]);

// ------------------- Format -------------------
export const formatNumber = (number, length = 2, padChar = "0") => {
  return number.toString().padStart(length, padChar);
};
