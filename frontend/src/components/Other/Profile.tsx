import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Improved Icons with better visuals
const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ProfileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

interface ProfileProps {
  onLogout: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  userName?: string;
  userRole?: string;
  userEmail?: string;
  avatarUrl?: string;
  className?: string;
}

const Profile: React.FC<ProfileProps> = ({ 
  onLogout,
  onSettingsClick = () => console.log('Settings clicked'),
  onProfileClick = () => console.log('Profile clicked'),
  userName = "User Name",
  userRole = "User Role", 
  userEmail = "user@example.com",
  avatarUrl,
  className
}) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate async operation
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <StyledWrapper className={className}>
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.div 
          className="card__avatar"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${userName}'s avatar`} />
          ) : (
            <AnimatePresence>
              <motion.div 
                className="avatar-fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="avatar-fallback"
              >
                {isHovered ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    👋
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {getInitials(userName)}
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
        
        <div className="card__content">
          <motion.div 
            className="card__title"
            whileHover={{ x: 2 }}
          >
            {userName}
          </motion.div>
          <div className="card__subtitle">{userRole}</div>
          <motion.div 
            className="card__email"
            whileHover={{ x: 2 }}
            onClick={() => navigator.clipboard.writeText(userEmail)}
            title="Click to copy"
          >
            {userEmail}
          </motion.div>
        </div>

        <div className="card__divider" />

        <div className="card__actions">
          <motion.button 
            className="card__btn"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
            whileTap={{ scale: 0.95 }}
            onClick={onSettingsClick}
            aria-label="Settings"
          >
            <SettingsIcon />
            Settings
          </motion.button>
          <motion.button 
            className="card__btn card__btn-solid"
            whileHover={{ scale: 1.05, backgroundColor: "#1a0a00" }}
            whileTap={{ scale: 0.95 }}
            onClick={onProfileClick}
            aria-label="Profile"
          >
            <ProfileIcon />
            Profile
          </motion.button>
        </div>

        <motion.button 
          className="card__logout"
          onClick={handleLogout}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(248, 85, 101, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoggingOut}
          aria-label={isLoggingOut ? "Logging out" : "Logout"}
        >
          <AnimatePresence mode="wait">
            {isLoggingOut ? (
              <motion.span
                key="logging-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="spinner"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(248, 85, 101, 0.3)",
                    borderTop: "2px solid var(--logout-color)",
                    borderRadius: "50%"
                  }}
                />
              </motion.span>
            ) : (
              <motion.span
                key="logout-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LogoutIcon />
              </motion.span>
            )}
          </AnimatePresence>
          {isLoggingOut ? 'Logging Out...' : 'Logout'}
        </motion.button>
      </motion.div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  --main-color: #280f03;
  --submain-color: #78858F;
  --bg-color: #fff;
  --divider-color: #f0f0f0;
  --logout-color: #f85565;
  --hover-color: #f8f8f8;
  --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  .card {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    width: 320px;
    padding: 24px;
    background: var(--bg-color);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    overflow: hidden;
    transition: var(--transition);
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff7e5f, #f85565);
  }

  .card__avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;
  }

  .card__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: var(--main-color);
    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
  }

  .card__content {
    text-align: center;
    width: 100%;
  }

  .card__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--main-color);
    margin-bottom: 4px;
    cursor: default;
  }

  .card__subtitle {
    font-size: 14px;
    color: var(--submain-color);
    font-weight: 500;
    margin-bottom: 8px;
    cursor: default;
  }

  .card__email {
    font-size: 13px;
    color: var(--submain-color);
    opacity: 0.8;
    cursor: pointer;
    transition: var(--transition);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }

  .card__email:hover {
    background: var(--hover-color);
    opacity: 1;
  }

  .card__divider {
    width: 100%;
    height: 1px;
    background: var(--divider-color);
    margin: 8px 0;
    position: relative;
  }

  .card__divider::after {
    content: '';
    position: absolute;
    left: 25%;
    right: 25%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--submain-color), transparent);
  }

  .card__actions {
    width: 100%;
    display: flex;
    gap: 12px;
  }

  .card__btn {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    outline: none;
    background: #f5f5f5;
    color: var(--main-color);
  }

  .card__btn svg {
    width: 16px;
    height: 16px;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: white;
  }

  .card__logout {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    background: transparent;
    border: none;
    color: var(--logout-color);
    margin-top: 8px;
  }

  .card__logout:hover {
    background: rgba(248, 85, 101, 0.1);
  }

  .card__logout:active {
    background: rgba(248, 85, 101, 0.2);
  }

  .card__logout:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Profile;