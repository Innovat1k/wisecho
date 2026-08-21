import { usePersistStorage } from "@/shared/hooks/usePersistStorage";
import QuoteLayout from "@/shared/components/layout/QuoteLayout";

function App() {
  usePersistStorage();

  return (
    <div className="min-h-[100dvh] w-full flex items-start md:items-center justify-center p-4 sm:p-6 lg:p-10 bg-[var(--bg)] overflow-x-hidden">
      <QuoteLayout />
    </div>
  );
}

export default App;
