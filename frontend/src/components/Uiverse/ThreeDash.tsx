import React, { useState } from 'react';
import styled from 'styled-components';

interface ThreeDashProps {
  onLogout: () => void;
  onCreateTask: () => void;
}

const ThreeDash: React.FC<ThreeDashProps> = ({ onLogout, onCreateTask }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledWrapper>
      <div className="menu-container">
        <button 
          className={`burger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </button>

        {isOpen && (
          <div className="menu-dropdown">
            <button 
              className="menu-item"
              onClick={() => {
                onCreateTask();
                setIsOpen(false);
              }}
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Task</span>
            </button>
            <button 
              className="menu-item"
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>     
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .menu-container {
    position: relative;
    display: inline-block;
  }

  .burger {
    position: relative;
    width: 40px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px 0;
    z-index: 100;
  }

  .line {
    display: block;
    height: 3px;
    width: 100%;
    background: #280f03;
    border-radius: 9px;
    transition: all 0.3s ease;
  }

  .burger.open .line1 {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .burger.open .line2 {
    opacity: 0;
  }

  .burger.open .line3 {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .menu-dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    background: #fff5e6;
    border: 1px solid rgba(248, 181, 109, 0.3);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 90;
    min-width: 200px;
    overflow: hidden;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    background: transparent;
    border: none;
    color: #280f03;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(248, 133, 101, 0.1);
      color: #f85565;
    }

    &:first-child {
      border-bottom: 1px solid rgba(248, 181, 109, 0.2);
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      stroke-width: 2;
    }
  }
`;

export default ThreeDash;