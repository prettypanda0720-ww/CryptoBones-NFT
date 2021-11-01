/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Service from 'components/cards/service';
// import icon4 from 'assets/images/icons/service4.png';
// import icon5 from 'assets/images/icons/service5.png';
// import icon6 from 'assets/images/icons/service6.png';
// import icon7 from 'assets/images/icons/service7.png';
// import icon8 from 'assets/images/icons/service8.png';
// import icon9 from 'assets/images/icons/service9.png';
import roadmap from 'assets/images/faq-back.png';

const data = [
  {
    id: 1,
    // icon: icon4,
    moreLink: '#learn-more',
    title: 'STAGE ONE',
    description: `0% Giveaway contest ended and winners rewarded:
    Pre-sale Minting started at this time`,
  },
  {
    id: 2,
    // icon: icon5,
    moreLink: '#learn-more',
    title: 'STAGE TWO',
    description: `25% 5 random holders will be airdropped a free CryptoBone`,
  },
  {
    id: 3,
    // icon: icon6,
    moreLink: '#learn-more',
    title: 'STAGE THREE',
    description: `75% Work initiated on CryptoBones The Game.`,
  },
  {
    id: 4,
    // icon: icon7,
    moreLink: '#learn-more',
    title: 'STAGE FOUR',
    description: `50% Funds added to Royalty passthrough pool from initial mint.`,
  },
  {
    id: 5,
    // icon: icon8,
    moreLink: '#learn-more',
    title: 'STAGE FIVE',
    description: `100% / maximum of 48 hours after initial mint;
    CryptoBones will stop being mintable regardless of how many sold and the reveal countdown started.
    At this time instructions on Royalty passthrough will be posted to our social media profiles, all secondary sale royalties will be passed through to token holders.`,
  }
];

const RoadMap = () => {
  return (
    <Box as="section" id="roadmap" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="CRYPTOBONES ROADMAP"
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
export default RoadMap;

const styles = {
  section: {
    backgroundColor: '#F9FAFC',
    pt: [9, 9, 9, 11],
    pb: [9, 9, 9, 12, 12, 14],
    backgroundImage: `url(${roadmap})`
  },
  heading: {
    mb: [6, null, null, 8, 9, null, 13],
    p: {
      maxWidth: 500,
      margin: '10px auto 0',
    },
  },
  contentWrapper: {
    gap: ['30px 30px', '30px 30px', '30px 30px', '80px 30px'],
    display: 'grid',
    justifyContent: ['center', 'center', 'center', 'unset'],
    gridTemplateColumns: [
      'repeat(1, 285px)',
      'repeat(1, 325px)',
      'repeat(1, 285px)',
      'repeat(3, 1fr)',
    ],
  },
};
