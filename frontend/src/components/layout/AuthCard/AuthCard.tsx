import React from 'react';

import styles from './AuthCard.module.scss';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title }) => {
  return (
    <div className={styles.authCard}>
      <h2 className={styles.title} >
        {title}
      </h2>
      {children}
    </div>
  );
};

export default AuthCard;
