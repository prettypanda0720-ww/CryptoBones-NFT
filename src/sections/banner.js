/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container, Text, Input } from 'theme-ui';
import CountdownTimer from "react-component-countdown-timer";
import Snackbar from '@mui/material/Snackbar';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState, useCallback } from "react";
import { useEthers } from "@usedapp/core";
import * as React from 'react';
import { utils } from "ethers";
import { GetTotalMigrate, GetMaxMintCount, GetCurrentStage, GetCurrentPrice, GetPublicMintingAvailableTime, GetNormalMintingAvailableTime, UseCryptoBones } from 'hooks';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Banner = () => {

  const { account } = useEthers();
  const balance = GetTotalMigrate(account);
  const maxCount = GetMaxMintCount();
  const [currentBalance, setCurrentBalance] = useState(0)
  const [currentMaxCount, setCurrentMaxCount] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [mintCount, setMintCount] = React.useState(1);
  const [msg, setMsg] = useState('');

  const [isPublicMint, setIsPublicMint] = useState(false);
  
  const [isNormalMint, setIsNormalMint] = useState(false);
  
  const [currStage, setCurrStage] = useState(0)

  const value = GetCurrentStage()
  
  const [currPrice, setCurrPrice] = useState(0)
  const price = GetCurrentPrice()

  // const a = GetNormalMintingAvailableTime()
  // const [publicAvailableTime, setPublicAvailableTime] = useState(-1)
  // if(publicAvailableTime == -1){
  //   const publicPeriod = GetPublicMintingAvailableTime()
  //   if(publicPeriod !== undefined && publicAvailableTime == -1) {
  //     setPublicAvailableTime(publicPeriod.toNumber())
  //   }
  //   console.log('public period', publicPeriod)
  // }

  const [publicAvailableTime, setPublicAvailableTime] = useState(-1)
  
  const publicPeriod = GetPublicMintingAvailableTime()
  
  const [normalAvailableTime, setNormalAvailableTime] = useState(-1)
  
  const normalPeriod = GetNormalMintingAvailableTime()
  
  useEffect(()=> { setCurrStage(value ? value.toNumber() : 0) }, [value])

  useEffect(()=> { setCurrPrice(price ? utils.formatEther(price) : 0) }, [price])

  useEffect(()=> { setNormalAvailableTime(normalPeriod ? normalPeriod.toNumber() : 0) }, [normalPeriod])

  useEffect(()=> { setPublicAvailableTime(publicPeriod ? publicPeriod.toNumber() : 0) }, [publicPeriod])

  useEffect(()=> { setCurrentBalance(balance ? balance.toNumber() : 0) }, [balance])

  useEffect(()=> { setCurrentMaxCount(maxCount ? maxCount.toNumber() : 0) }, [maxCount])

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
        console.log('Success transaction', res.transaction)
        console.log('Success receipt', res.receipt)
        msg = "Minting transaction success!"
        setOpen(true)
        setMsg(msg)
        break
      case "None":
        console.log('None transaction', res.transaction)
        break
      case "Mining":
        console.log('Mining transaction', res.transaction)
        msg = "Minting now";
        setOpen(true)
        setMsg(msg)
        break
      case "Failed":
        console.log('Failed transaction', res.transaction)
        console.log('Failed receipt', res.receipt)
        msg = "Minting transaction failed";
        setOpen(true)
        setMsg(msg)
        break;
      case "Exception":
        console.log('Exception errorMessage', res.errorMessage)
        // msg = "Mint Failed, Note: You have insufficient funds, or You aren't registered in whitelist, or You have already 10 tokens"
        msg = "Transaction Error!"
        setOpen(true)
        setMsg(msg)
        break
      default:
        break  
    }
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
    if(currentBalance >= currentMaxCount) {
      setOpen(true)
      setMsg("Overflow " + currentMaxCount.toString() + " Max Tokens. You can't mint anymore.")
      return
    }
    await requestPresaleToken({value: utils.parseEther("0.05")})
    console.log('presaleResponse', presaleRes)
    showTransactionResult(presaleRes)
  }

  async function onPublicMint() {
    if(currentBalance + mintCount > currentMaxCount) {
      setOpen(true)
      setMsg("Overflow " + currentMaxCount.toString() + " Max Tokens")
      return
    }
    let price = (currPrice * mintCount).toString()
    console.log('pubilc mint price', price)
    await requestPublicToken(mintCount, {value: utils.parseEther(price)})
    console.log('publicResponse', publicRes)
    showTransactionResult(publicRes)
  }

  async function onNormalMint() {
    if(currentBalance >= currentMaxCount) {
      setOpen(true)
      setMsg("Overflow " + maxCount.toString() + " Max Tokens. You can't mint anymore.")
      return
    }
    await requestNormalToken({value: utils.parseEther("0.05")})
    console.log('normalResponse', normalRes)
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
              <Text sx={styles.priceTypography}>You can mint with 0.05ETH</Text>
              <Button
                style={styles.mintBtn}
                variant="outlined"
                size="large"
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
              { PublicCountDown() }
              
            </Box>
            <Box sx={{marginTop: '10px'}}>
              <Slider size="large" defaultValue={1} min={1} max={10} style={{width: '150px', color: '#C8C7C7'}} valueLabelDisplay="auto" onChange={(event) => {setMintCount(event.target.value)}} />
            </Box>
            <Button
              style={styles.mintBtn}
              variant="outlined"
              size="large"
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
              { NormalCountDown() }
              <Button
                  style={styles.mintBtn}
                  variant="outlined"
                  size="large"
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

  const NormalCountDown = () => {
     if(normalAvailableTime !== -1) {
       return (
        <CountdownTimer count={normalAvailableTime} showTitle size={28} labelSize={16} color="#27bf65"  backgroundColor="transparent" onEnd={showNormalEndMsg}/>
       )
     } else {
       return (
        <div>zero</div>
       )
     }
  }

  const PublicCountDown = () => {
    if(publicAvailableTime !== -1) {
      return (
        <CountdownTimer count={publicAvailableTime} showTitle size={28} labelSize={16} color="#27bf65"  backgroundColor="transparent" hideDay={true} onEnd={showAuctionEndMsg}/>
      )
    } else {
      return (
       <div>zero</div>
      )
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
    backgroundColor: 'rgb(0,0,0)',
    pt: [105, null, null, 140, 15, null, 140],
    pb: [8, null, null, null, null, null, null],
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
    color: 'white',
    fontWeight: '400'
  },
  mintArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#292827',
    borderRadius: '20px',
    pt: [2, null, null, 5, 6, 6, 6],
    pb: [2, null, null, 5, 6, 6, 6],
    pl: [3, null, null, 10, 10, 10, 10],
    pr: [3, null, null, 10, 10, 10, 10],
  },
  mintBtn: {
    marginTop: '20px',
    backgroundColor: 'white',
    color: 'black',
    border: '#292827',
    width: [150, 150, 150, 150, 160, 160, 160],
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.6)',
    }
  },
  countDownArea: {
    paddingTop: '20px',
    width: [300, 300, 300, 300, 310, 310, 310],
    paddingBottom: '20px',
    backgroundColor: '#292827',
    borderRadius: '20px',
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
