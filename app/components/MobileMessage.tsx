// app/components/MobileMessage.tsx
export default function MobileMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-50">
      <svg
        className="w-16 h-16 mb-6 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
      </svg>
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">👋 Welcome!</h1>
      <p className="text-lg text-gray-700 mb-1">
        This application is optimized for desktop viewing.
      </p>
      <p className="text-md text-gray-600">
        For the best experience, please switch to a larger screen.
      </p>
    </div>
  );
}
