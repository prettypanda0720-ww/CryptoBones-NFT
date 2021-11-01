import { useEffect } from 'react';
import Router from 'next/router';
import { initGA, logPageView } from 'analytics';
import '../scss/index.scss';
import 'rc-tabs/assets/index.css';
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import { DAppProvider } from "@usedapp/core";
import { AppProps } from 'next/dist/next-server/lib/router/router';

export default function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }, []);

  return (
    <DAppProvider config={{}}>
      <Component {...pageProps} />;
    </DAppProvider>
  )
}
