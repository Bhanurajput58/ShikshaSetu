import React from 'react';
import EducatorNav from './EducatorNav';

const EducatorLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EducatorNav />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
};

export default EducatorLayout; 