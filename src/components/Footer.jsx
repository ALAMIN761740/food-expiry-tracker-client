export default function Footer() {
  return (
    <footer className="bg-base-200 text-center p-6 mt-10 shadow-inner">
      <p className="text-sm font-semibold">Food Expiry Tracker</p>
      <p className="text-xs text-gray-600">Track your food items and reduce waste efficiently.</p>
      <div className="mt-2 flex justify-center gap-4 text-blue-500">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy</a>
      </div>
      <p className="text-gray-400 mt-2 text-xs">© 2025 Food Expiry Tracker. All rights reserved.</p>
    </footer>
  );
}
