/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Button } from 'theme-ui';
import Sticky from 'react-stickynode';
import Logo from 'components/logo';
import { NavLink } from 'components/link';
import { DrawerProvider } from 'contexts/drawer/drawer-provider';
import NavbarDrawer from './navbar-drawer';
import menuItems from './header.data';
import ConnectButton from 'components/ConnectButton';
import AccountModal from 'components/AccountModal';
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

export default function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DrawerProvider>
      <Box sx={styles.headerWrapper}>
        <Sticky enabled={true} top={0} activeClass="is-sticky" innerZ={100}>
          <Box as="header" sx={styles.header}>
            <Container>
              <Box sx={styles.headerInner}>
                {/* <Logo sx={styles.logo} /> */}
                <Box as="nav" sx={styles.navbar} className="navbar">
                  <Box as="ul" sx={styles.navList}>
                    {menuItems.map(({ path, label }, i) => (
                      <li key={i} sx={styles.navItem}>
                        <NavLink path={path} label={label} />
                      </li>
                    ))}
                  </Box>
                  {/* <ChakraProvider>
                    <ConnectButton handleOpenModal={onOpen} sx={styles.getStartedDesktop}/>
                    <AccountModal isOpen={isOpen} onClose={onClose} />
                  </ChakraProvider> */}
                  {/* <Button variant="text" sx={styles.getStartedDesktop}>
                    Get Started
                  </Button> */}
                </Box>
                <ChakraProvider>
                  <ConnectButton handleOpenModal={onOpen} sx={styles.getStartedMobile}/>
                  <AccountModal isOpen={isOpen} onClose={onClose} />
                </ChakraProvider>
                {/* <Button variant="text" sx={styles.getStartedMobile}>
                  Get Started
                </Button> */}
                <NavbarDrawer />
              </Box>
            </Container>
          </Box>
        </Sticky>
      </Box>
    </DrawerProvider>
  );
}

const styles = {
  headerWrapper: {
    backgroundColor: '#1F2B6C !important',
    '.is-sticky': {
      header: {
        backgroundColor: '#1F2B6C !important',
        boxShadow: '0 6px 13px rgba(22,41,91,0.1)',
        paddingTop: '15px',
        paddingBottom: '15px',
      },
    },
  },
  header: {
    position: 'fixed',
    left: 0,
    right: 0,
    py: 4,
    transition: 'all 0.3s ease-in-out 0s',
    backgroundColor: '#1F2B6C !important',
    '&.is-mobile-menu': {
      backgroundColor: '#1F2B6C !important',
    },
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    mr: [null, null, null, null, 6, 12],
  },
  navbar: {
    display: ['none', null, null, null, 'flex'],
    alignItems: 'center',
    flexGrow: 1,
    // justifyContent: 'center',
  },
  navList: {
    display: ['flex'],
    listStyle: 'none',
    // marginLeft: 'auto',
    flexGrow: 1,
    p: 0,
    // 'li:last-child': {
    //   ml: ['auto'],
    // },
    '.nav-item': {
      cursor: 'pointer',
      fontWeight: 400,
      padding: 0,
      color: 'rgba(255,255,255,0.8)',
      margin: [0, 0, 0, 0, '0 20px'],
    },
    '.active': {
      color: 'rgba(255,255,255,0.9)',
    },
  },
  getStartedDesktop: {
    color: 'primary',
    display: ['none', 'none', 'none', 'none', 'flex'],
  },
  getStartedMobile: {
    color: 'primary',
    fontSize: [1],
    minHeight: 30,
    m: ['0 15px 0 auto'],
    padding: '0 11px',
    display: ['flex', null, null, null, 'none'],
  },
  closeButton: {
    height: '32px',
    padding: '4px',
    minHeight: 'auto',
    width: '32px',
    ml: '3px',
    path: {
      stroke: 'text',
    },
  },
  walletConnectBtn: {
    marginLeft: '10px'
  }
};
