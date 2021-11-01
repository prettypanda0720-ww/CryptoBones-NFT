/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Text, Button, Input, Slider } from 'theme-ui';
import CountdownTimer from "react-component-countdown-timer";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import * as React from 'react';
import { utils } from "ethers";
import { GetCurrentStage, GetCurrentPrice, UseCryptoBones } from 'hooks';
import bannerIllustration from 'assets/images/banner-illustration.png'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Banner = () => {

  const [open, setOpen] = React.useState(false);
  const [mintCount, setMintCount] = React.useState(1);
  const [msg, setMsg] = useState('');

  const [isPublicMint, setIsPublicMint] = useState(false);
  
  const [isNormalMint, setIsNormalMint] = useState(false);
  
  const [currStage, setCurrStage] = useState(0)
  const value = GetCurrentStage()
  console.log('current stage', value)
  const [currPrice, setCurrPrice] = useState(0)
  const price = GetCurrentPrice()
  
  useEffect(()=> { setCurrStage(value ? value.toNumber() : 0) }, [value])

  useEffect(()=> { setCurrPrice(price ? utils.formatEther(price) : 0) }, [price])

  useEffect(()=> { doPostTransaction(currStage) }, [currStage])

  const { state: presaleRes, send: requestPresaleToken } = UseCryptoBones("requestPresaleToken")
    
  const { state: publicRes, send: requestPublicToken } = UseCryptoBones("requestPublicToken")

  const { state: normalRes, send: requestNormalToken } = UseCryptoBones("requestNormalToken")

  function doPostTransaction(val) {
    let msg = ""
    switch (val) {
      case 1:
        msg = "Presale is available!"
        setOpen(true)
        setMsg(msg)
        break
      case 2:
        msg = "Public Minting is available!"
        setOpen(true)
        setMsg(msg)
        break 
      case 3:
        msg = "Normal Minting is available!"
        setOpen(true)
        setMsg(msg)
        break 
      default:
        break
    }
  }

  function showTransactionResult(res) {
    console.log('transaction response', res)
    let msg = "";
    switch (res.status) {
      case "Success":
        msg = "Minting transaction success!"
        break
      case "None":
        msg = "Transaction Success!"
        break
      case "Mining":
        msg = "Minting now";
        break
      case "Fail":
        msg = "Minting transaction failed";
        break;
      case "Exception":
        msg = "You may have below errors! `insufficient funds`, `unregistered in whitelist`, `overflow 10 tokens`"
        break
      default:
        break  
    }
    setOpen(true)
    setMsg(msg)  
  }

  function showAuctionEndMsg() {
    let msg = ""
    msg = "Public Minting is ended!"
    setIsPublicMint(true)
    setOpen(true)
    setMsg(msg)
  }

  function showNormalEndMsg() {
    let msg = ""
    msg = "Minting is ended!"
    setIsNormalMint(true)
    setOpen(true)
    setMsg(msg)
  }

  async function onPresaleMint() {
    await requestPresaleToken({value: utils.parseEther("0.05")})
    showTransactionResult(presaleRes)
  }

  async function onPublicMint() {
    let price = (currPrice * mintCount).toString()
    console.log('pubilc mint price', price)
    await requestPublicToken(mintCount, {value: utils.parseEther(price)});
    showTransactionResult(publicRes)
  }

  async function onNormalMint() {
    await requestNormalToken({value: utils.parseEther("0.05")})
    showTransactionResult(normalRes)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const MintButton = () => {
    switch (currStage) {
      case 0:
        return (
            <Box sx={styles.mintArea}>
              <Text sx={styles.priceTypography}>Minting is not started yet.</Text>
            </Box>
        );
        break
      case 1:
        return (
            <Box sx={styles.mintArea}>
              <Button
                sx={styles.mintBtn}
                variant="contained"
                onClick={onPresaleMint}
                >
                Presale
              </Button>
            </Box>
        );
        break
      case 2:
        return (
          <Box sx={styles.countDownArea}>
            <Box sx={{marginTop: '10px'}}>
              <Text sx={styles.priceTypography}>{currPrice.toString().substr(0,6)} ETH</Text>
            </Box>
            <Box sx={{marginTop: '10px'}}>
              <CountdownTimer count={14400} showTitle size={28} labelSize={16} color="#27bf65"  backgroundColor="transparent" hideDay={true} onEnd={showAuctionEndMsg}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Slider defaultValue={1} min={1} max={10} onChange={(event) => {setMintCount(event.target.value)}} />
              <Input sx={styles.sliderInput} disabled value={mintCount} />
            </Box>
            <Button
              sx={styles.mintBtn, {marginTop: '20px'}}
              variant="contained"
              onClick={onPublicMint}
              disabled={isPublicMint}>
              Public Mint
            </Button>
          </Box>
        );
        break
      case 3:
        return (
          <Box sx={styles.countDownArea}>
              <CountdownTimer count={172800} showTitle size={28} labelSize={16} color="#27bf65"  backgroundColor="transparent" onEnd={showNormalEndMsg}/>
              <Button
                  sx={styles.mintBtn, {marginTop: '10px'}}
                  variant="contained"
                  onClick={onNormalMint}
                  disabled={isNormalMint}>
                  Normal Mint
              </Button>
          </Box>
        );
        break
      case 4:
        return (
          <Box sx={styles.mintArea}>
            <Text sx={styles.priceTypography}>All tokens are sold out.</Text>
          </Box>
        );
      deafult:
          break    
    }
  }

  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Snackbar style={{marginTop: '70px'}} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: '#E6F7FF', color: 'black' }}>
            {msg}
          </Alert>
        </Snackbar>
        <Box sx={styles.contentWrapper}>
          <Box as="figure" sx={styles.illustration}>
            { MintButton() }
            {/* <Image src={illustration} alt="illustration" /> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    position: 'relative',
    pt: [105, null, null, 140, 15, null, 140],
    pb: [8, null, null, 70, 15, null, 70],
    zIndex: 0,
    // backgroundImage: `url(${bannerIllustration})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // ':before': {
    //   backgroundColor: rgba('#FFF5ED', 0.5),
    //   content: ['none', null, null, `''`],
    //   position: 'absolute',
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   height: 72,
    //   zIndex: -1,
    // },
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  heading: {
    mb: [30],
    maxWidth: [null, null, null, 500, 560, 730],
    h2: {
      fontSize: [8, null, null, 8, 9, 10, 11],
      lineHeight: [1.57],
    },
    p: {
      fontSize: [1, null, null, 3],
      lineHeight: [1.87, null, null, 2.33],
    },
  },
  illustration: {
    display: ['block', null, null, 'flex'],
    position: 'relative',
    img: {
      display: ['none', null, null, 'block'],
      maxWidth: ['90%'],
      m: ['0 auto'],
    },
  },
  buttonWrapper: {
    textAlign: ['center'],
    position: ['static', null, null, 'absolute'],
    left: '50%',
    top: 0,
    transform: ['unset', null, null, 'translateX(-50%)'],
  },
  priceTypography: {
    fontSize: [5, null, null, 7, 7, 8, 8],
    color: '#27bf65',
    fontWeight: '400'
  },
  mintArea: {
    border: 'solid 2px #00E4FF !important',
    borderRadius: '20px',
    pt: [2, null, null, 5, 6, 6, 6],
    pb: [2, null, null, 5, 6, 6, 6],
    pl: [3, null, null, 10, 10, 10, 10],
    pr: [3, null, null, 10, 10, 10, 10],
  },
  mintBtn: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
    color: 'black',
    width: [150, 150, 150, 150, 160, 160, 160],
    '&:hover': {
      backgroundColor: 'rgba(255,255,255)',
    }
  },
  countDownArea: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  sliderInput: {
    marginLeft: '10px',
    width: '60px',
    height: '35px',
    border: 'solid 1px grey'
  }
};
