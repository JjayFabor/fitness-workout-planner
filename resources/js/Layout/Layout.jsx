import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <header className="w-full text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800">Workout Planner</h1>
      </header>
      
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="w-full text-center py-4 bg-gray-300">
        <p className="text-gray-700">© 2025 Workout Planner</p>
      </footer>
    </div>
  );
};

export default Layout;