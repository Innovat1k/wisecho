export const filterQuote = (elems, category) => {
  const randomNum = () => {
    return Math.floor(Math.random() * elems.length);
  };

  // Si tu veux filtrer par catégorie avant de piocher :
  const filtered = category 
    ? elems.filter(q => q.category === category) 
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