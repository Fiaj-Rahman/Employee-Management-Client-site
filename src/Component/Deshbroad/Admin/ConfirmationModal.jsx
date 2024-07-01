import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
<h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
<p className="text-gray-700 mb-4">Are you sure you want to proceed?</p>
<div className="flex justify-end">
<button
         onClick={onCancel}
         className="text-gray-600 mr-4 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
       >
Cancel
</button>
<button
         onClick={onConfirm}
         className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
       >
Confirm
</button>
</div>
</div>
    </div>
  );
};

export default ConfirmationModal;
