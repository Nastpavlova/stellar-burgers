import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface NavItemProps {
  to: string;
  icon: (isActive: boolean) => React.ReactNode;
  text: string;
  userName?: string;
  className?: string; //дополнительные CSS классы
  'data-testid'?: string;
}

// кастомный компонент навигации для хедера
const NavItem = ({
  to,
  icon,
  text,
  userName,
  className,
  'data-testid': dataTestId
}: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(styles.link, isActive && styles.link_active, className)
    }
    data-testid={dataTestId}
  >
    {({ isActive }) => (
      <div className={clsx(styles.link, isActive && styles.link_active)}>
        {icon(isActive)}
        <p className='text text_type_main-default ml-2'>{userName || text}</p>
      </div>
    )}
  </NavLink>
);

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header} data-testid='app-header'>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavItem
          to='/'
          icon={(isActive) => (
            <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
          )}
          text='Конструктор'
          className='mr-10'
          data-testid='constructor-link'
        />
        <NavItem
          to='/feed'
          icon={(isActive) => (
            <ListIcon type={isActive ? 'primary' : 'secondary'} />
          )}
          text='Лента заказов'
          data-testid='feed-link'
        />
      </div>

      <div className={styles.logo}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.link_active)
          }
          data-testid='logo-link'
        >
          <Logo className='' />
        </NavLink>
      </div>

      <div className={styles.link_position_last}>
        <NavItem
          to='/profile'
          icon={(isActive) => (
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
          )}
          text='Личный кабинет'
          userName={userName}
          data-testid='profile-link'
        />
      </div>
    </nav>
  </header>
);
