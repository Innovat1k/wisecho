import { useState } from "react";

export const useShowDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return { showDetails, handleShowDetails };
};
