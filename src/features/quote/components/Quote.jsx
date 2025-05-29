import { LuWifiOff } from "react-icons/lu";
import Loader from "../../../shared/components/Loader";

function Quote({quote, status}) {
  return (
    <>
      {status.isLoading ? (
        <Loader />
      ) : status.hasError ? (
        <div className="my-20 flex flex-col items-center gap-2">
          <LuWifiOff size={20} />
          <p className="text-[var(--text-secondary)]">
            Please refresh api server error.
          </p>
        </div>
      ) : (
        <>
          <p className="text-2xl md:text-xl text-[var(--text-primary)] mb-6 leading-relaxed">
            “ {quote.body} ”
          </p>

          <div className="mb-14 flex flex-col gap-2">
            <div className="flex justify-around items-center">
              {quote.tags &&
                quote.tags.map((tag, index) => (
                  <span
                    className="text-sm text-gray-400 capitalize"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <span className="text-sm italic text-[var(--text-secondary)]">
              {quote.author}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default Quote;
