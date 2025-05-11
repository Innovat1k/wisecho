import { LuSmartphone } from "react-icons/lu";

function ResponsiveGuard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md text-center p-6 bg-white shadow-md rounded-lg">
        <LuSmartphone className="mx-auto text-4xl text-blue-500 mb-4" />
        <p className="text-gray-800 text-xl font-medium">
          The app is currently mobile-first. Support for other screen sizes is
          on the way. Stay tuned for the full release! 😊
        </p>
      </div>
    </div>
  );
}

export default ResponsiveGuard;
