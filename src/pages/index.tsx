import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import About from 'sections/about';
// import Testimonials from 'sections/testimonials';
import CryptoBones from 'sections/cryptobones';
import RoadMap from 'sections/roadmap';
import Questions from 'sections/questions';
// import WhyUs from 'sections/why-us';
// import SubscribeUs from 'sections/subscribe-us';
import Blog from 'sections/blog';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="CryptoBones"
          description="Collection of free top of the line startup landing templates built using react/ next js. Free to download, simply edit and deploy! Updated weekly!"
        />
        <Banner />
        <About />
        <CryptoBones />
        {/* <Testimonials /> */}
        <RoadMap />
        <Questions />
        {/* <WhyUs /> */}
        {/* <Blog /> */}
        {/* <SubscribeUs /> */}
      </Layout>
    </ThemeProvider>
  );
}
