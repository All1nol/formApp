import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HelpButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const isTemplatePage = location.pathname.includes('/template/');
    const templateId = isTemplatePage ? location.pathname.split('/')[2] : null;
    const templateTitle = document.title.split(' - ')[0];

    navigate('/create-ticket', {
      state: {
        template: templateId ? {
          id: templateId,
          title: templateTitle
        } : null
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-cyber-purple hover:bg-cyber-pink 
                 rounded-full p-4 shadow-neon transition-all duration-300
                 hover:scale-110 z-50"
      aria-label="Get Help"
    >
      <svg 
        className="w-6 h-6 text-white"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
    </button>
  );
};

export default HelpButton;