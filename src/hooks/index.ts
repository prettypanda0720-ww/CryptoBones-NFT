import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import AuctionNFTAbi from "../abi/AuctionNFT.json";
import { AuctionNFTContractAddress } from "../contracts";

const auctionContractInterface = new ethers.utils.Interface(AuctionNFTAbi);
const auctionContract = new Contract(AuctionNFTContractAddress, auctionContractInterface);

export function GetTotalSupply() {
  const [balance]: any =
    useContractCall({
      abi: auctionContractInterface,
      address: AuctionNFTContractAddress,
      method: "totalSupply",
      args: [],
    }) ?? [];
  console.log(balance);
  return balance;
}

export function GetCurrentStage() {
  const [stage]: any =
    useContractCall({
      abi: auctionContractInterface,
      address: AuctionNFTContractAddress,
      method: "getCurrentStage",
      args: [],
    }) ?? [];
  console.log(stage);
  return stage;
}

export function GetCurrentPrice() {
    const [currPrice]: any =
      useContractCall({
        abi: auctionContractInterface,
        address: AuctionNFTContractAddress,
        method: "getCurrentPrice",
        args: [],
      }) ?? [];
    console.log(currPrice);
    return currPrice;
}

export function UseCryptoBones(methodName: string) {
    const { state, send } = useContractFunction(auctionContract, methodName, {});
    return { state, send };
}

export function GetNormalMintingAvailableTime() {
    const [normalMintingTime]: any =
      useContractCall({
        abi: auctionContractInterface,
        address: AuctionNFTContractAddress,
        method: "getNormalMintingAvailableTime",
        args: [],
      }) ?? [];
    console.log(normalMintingTime);
    return normalMintingTime;
}

export function GetPublicMintingAvailableTime() {
  const [publicMintingTime]: any =
    useContractCall({
      abi: auctionContractInterface,
      address: AuctionNFTContractAddress,
      method: "getPublicMintingAvailableTime",
      args: [],
    }) ?? [];
  console.log(publicMintingTime);
  return publicMintingTime;
}

export function GetMaxMintCount() {
  const [maxMintCount]: any =
    useContractCall({
      abi: auctionContractInterface,
      address: AuctionNFTContractAddress,
      method: "getMaxMintCount",
      args: [],
    }) ?? [];
  console.log(maxMintCount);
  return maxMintCount;
}