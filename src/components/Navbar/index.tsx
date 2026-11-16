import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.less';

const navItems = [
  { name: '作品', path: '/' },
  { name: '项目', path: '/projects' },
  { name: '笔记', path: '/note' },
  { name: '关于', path: '/about' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerToggle = useCallback(() => setMobileOpen(prev => !prev), []);

  return (
    <>
      <AppBar
        position="fixed"
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        elevation={0}
        sx={{ backgroundColor: 'transparent', backgroundImage: 'none' }}
      >
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" component={Link} to="/" className={styles.logo}>
            ST2EAM
          </Typography>

          {isMobile ? (
            <IconButton
              onClick={handleDrawerToggle}
              className={styles.menuBtn}
              aria-label="打开菜单"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box className={styles.navLinks}>
              {navItems.map(item => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  disableRipple
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={styles.drawerRoot}
      >
        <Box className={styles.mobileDrawer}>
          <Box className={styles.drawerHeader}>
            <Typography variant="h6" className={styles.drawerLogo}>
              ST2EAM
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              className={styles.closeBtn}
              aria-label="关闭菜单"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List className={styles.drawerList}>
            {navItems.map(item => (
              <ListItem
                key={item.name}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                className={`${styles.drawerItem} ${location.pathname === item.path ? styles.active : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <ListItemText
                  primary={item.name}
                  slotProps={{ primary: { className: styles.drawerItemText } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
