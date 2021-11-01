/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Divider } from 'theme-ui';
import { rgba } from 'polished';
import SectionHeading from 'components/section-heading';
import Service from 'components/cards/service';
// import icon1 from 'assets/images/icons/service1.png';
// import icon2 from 'assets/images/icons/service2.png';
// import icon3 from 'assets/images/icons/service3.png';

const data = [
  {
    id: 1,
    // icon: icon1,
    title: 'What is CryptoBones?',
    description: `A collection of 10,000 unique spooky Skeleton based NFTs with passthrough royalties.`,
  },
  {
    id: 3,
    // icon: icon2,
    title: 'Giving Back',
    description: `All secondary sale royalties will be given to token holders, initial mint will be donated to charity.`,
  },
  {
    id: 4,
    // icon: icon3,
    title: 'Rarities',
    description: `Rarities will be displayed on rarity.tools shortly after reveal.`,
  },
];

const About = () => {
  return (
    <Box as="section" id="about" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="ABOUT CRYPTOBONES"
          description=""
        />
        <Box sx={styles.contentWrapper}>
          {data?.map((item) => (
            <Service key={item.id} item={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;

const styles = {
  section: {
    // backgroundColor: rgba('#FFF5ED', 0.5),
    pt: [5, 5, 5, 7, 7, 8, 9],
    pb: [5, 5, 5, 7, 7, 8, 9],
  },
  heading: {
    maxWidth: [null, null, null, 455, 660],
    mb: [1, null, null, 3, null, 4, 8],
  },
  contentWrapper: {
    gap: 30,
    display: 'grid',
    justifyContent: ['center', null, null, 'unset'],
    gridTemplateColumns: [
      'repeat(1, 285px)',
      'repeat(1, 325px)',
      'repeat(1, 285px)',
      'repeat(3, 1fr)',
    ],
  },
};
