import { useAtomValue } from "jotai";
import AppDetails from "./components/AppDetails";
import MainCard from "./components/MainCard";
import { useShowDetails } from "./hooks/useShowDetails";
import { appTheme } from "./atoms/atoms";
import { useResponsive } from "./hooks/useResponsive";

function App() {
  const { showDetails, handleShowDetails } = useShowDetails();
  const screen = useResponsive();

  const curTheme = useAtomValue(appTheme);

  return (
    <div
      className={`h-[100dvh] flex justify-center md:items-center ${
        curTheme === "modern"
          ? "bg-light-frost"
          : curTheme === "warm"
          ? "bg-cream-beige"
          : ""
      }`}
    >
      {screen.isMobile ? (
        <>
          {!showDetails ? (
            <MainCard openDetails={handleShowDetails} />
          ) : (
            <AppDetails closeDetails={handleShowDetails} />
          )}
        </>
      ) : (
        <>
          <MainCard />
          <AppDetails />
        </>
      )}
    </div>
  );
}

export default App;
