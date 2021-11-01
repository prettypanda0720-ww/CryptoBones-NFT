/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from 'components/section-heading';
import Service from 'components/cards/service';
import roadmap from 'assets/images/faq-back.png';
import {
    Grid, 
    Typography,  
    Collapse, 
    CardActions, 
    IconButton
} from '@material-ui/core'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"

const Questions = () => {
  return (
    <Box as="section" id="faq" sx={styles.section}>
      <Container>
        <SectionHeading
          sx={styles.heading}
          title="FREQUENTLY ASKED QUESTIONS"
          description=""
        />
        <Grid container>
            <Grid item xs={12} md={2}></Grid>
            <Grid item xs={12} md={8}>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                        <AccordionButton sx={styles.accodian}>
                            <Box flex="1" textAlign="left" sx={styles.titleGroup}>
                            What is the price of a CryptoBone?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel mt={4} pb={4} sx={styles.editContainer}>
                        For pre-sale whitelist members the mint price will be 0.05 Eth. For the public mint, it will be auctioned off via a dutch auction starting at 0.15 Eth ending at 0.05 Eth after 4 hours. If there is still remaining CryptoBones available after the 4 hour period they will be available for a maximum of 48 hours at the bottom price of 0.05 Eth.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem sx={{marginTop: '10px'}}>
                        <h2>
                        <AccordionButton sx={styles.accodian}>
                            <Box flex="1" textAlign="left">
                            How many CryptoBones can I purchase at once?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel mt={4} pb={4} sx={styles.editContainer}>
                        You may mint up to ten (10) at one single time.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem sx={{marginTop: '10px'}}>
                        <h2>
                        <AccordionButton sx={styles.accodian}>
                            <Box flex="1" textAlign="left">
                            What are the perks to minting a CryptoBone?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel mt={4} pb={4} sx={styles.editContainer}>
                        A cool PFP duh! Besides that 100% of secondary sales will be returned to the token holders, additional information on how to claim your token for free will be announced shortly before reveal. 
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem sx={{marginTop: '10px'}}>
                        <h2>
                        <AccordionButton sx={styles.accodian}>
                            <Box flex="1" textAlign="left">
                            When will the CryptoBones be revealed?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel mt={4} pb={4} sx={styles.editContainer}>
                        The reveal will occur 72 hours after the start of the initial public mint.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Grid>
            <Grid item xs={12} md={2}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Questions;

const styles = {
  section: {
    backgroundColor: '#F9FAFC',
    pt: [9, 9, 9, 11],
    pb: [9, 9, 9, 12, 12, 14],
    backgroundImage: `url(${roadmap})`
  },
  accodian: {
    width: '100%',
    height: '46px',
    background: '#E1EFF4',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '14px',
    paddingRight: '14px',
    alignItems: 'center',
    color: '#1F2B6C',
    boxShadow: '0px 0px 4px 3px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        cursor: 'pointer',
    }
  },
  titleGroup: {
    color: '#1F2B6C',
    fontFamily: 'Gotham Rounded',
    fontSize: '15px',
    fontWeight: '350px',
  },
  editContainer: {
    padding: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    boxShadow: '0px 0px 4px 3px rgba(0, 0, 0, 0.1)',
    color: '#4255BB',
    background: '#E1EFF4',
    borderRadius: '15px',
    width: '100%',
    fontWeight: '350px',
    fontSize: '15px',
    textAlign: 'left'
  },
}

