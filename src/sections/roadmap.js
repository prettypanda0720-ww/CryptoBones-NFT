/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import roadmap from 'assets/images/faq-back.png';
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const RoadMap = () => {
  return (
    <Box as="section" id="roadmap" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="CRYPTOBONES ROADMAP"
          description=""
        />
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 style={styles.title}>STAGE ONE 0%</h3>
              <p style={styles.description}>0% Giveaway contest ended and winners rewarded<br/>:Pre-sale Minting started at this time.</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 style={styles.title}>STAGE TWO 25%</h3>
              <p style={styles.description}>25% 5 random holders will be airdropped a free CryptoBone.</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 style={styles.title}>STAGE THREE 75%</h3>
              <p style={styles.description}>75% Work initiated on CryptoBones The Game.</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 style={styles.title}>STAGE FOUR 50%</h3>
              <p style={styles.description}>50% Funds added to Royalty passthrough pool from initial mint.</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 style={styles.title}>STAGE FIVE 100%</h3>
              <p style={styles.description}>100% / maximum of 48 hours after initial mint.<br/>CryptoBones will stop being mintable regardless of how many sold and the reveal countdown started.<br/>At this time instructions on Royalty passthrough will be posted to our social media profiles, all secondary sale royalties will be passed through to token holders</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </Box>
  );
};
export default RoadMap;

const styles = {
  section: {
    backgroundColor: 'rgb(0,0,0)',
    pt: [9, 9, 9, 11],
    pb: [9, 9, 9, 10, 10, 10],
    // backgroundImage: `url(${roadmap})`
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
  timelineWrapper: {
    textAlign: 'left'
  },
  wrapper: {
    backgroundColor: '#1F1E1D',  
    borderRadius: '6px',
  },
  title: {
    color: '#FEFEFE',
    fontSize: '18px'
  },
  description: {
    color: '#C5C5C5',
    fontSize: '14px'
  }
};
