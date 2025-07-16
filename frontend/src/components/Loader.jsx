import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 border-4 border-cyan-500 border-dashed rounded-full animate-spin"></div>
        <div className="w-8 h-8 bg-cyan-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader;
