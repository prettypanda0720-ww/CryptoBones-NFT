/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import mainBackground from 'assets/images/main.png';
export default function Layout({ children }) {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header />
      <main
        sx={styles.main}
      >
        {children}
      </main>
      <Footer />
    </Flex>
  );
}

const styles = {
  main: {
    variant: 'layout.main',
    backgroundImage: `url(${mainBackground})`
  }
}