import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 relative overflow-hidden">

      {/* Animated Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-black rounded-full opacity-20 blur-3xl animate-spin-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-500 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>

      {/* Main Heading */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-center text-gray-900 drop-shadow-lg">
        Expense Management
      </h1>

      {/* Subheading / Description */}
      <p className="mt-6 text-center text-gray-700 text-lg sm:text-xl max-w-3xl leading-relaxed drop-shadow-sm">
        Track your income and expenses efficiently. Gain control over your finances, reduce unnecessary costs, 
        and make smarter budgeting decisions with confidence.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-6">
        <Link
          href="/sign-in"
          className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg 
          hover:bg-green-700 hover:scale-105 transition-transform duration-200 text-center"
        >
          Sign In
        </Link>

        <Link
          href="#"
          className="px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold 
          hover:bg-gray-200 hover:scale-105 transition-transform duration-200 text-center"
        >
          Learn More
        </Link>
      </div>

    </div>
  );
}
