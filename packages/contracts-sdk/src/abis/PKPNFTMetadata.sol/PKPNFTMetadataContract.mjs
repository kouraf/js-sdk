import { ethers } from "ethers";
import { PKPNFTMetadataData } from "./PKPNFTMetadataData.mjs";

export const getPKPNFTMetadataContract = (provider) => new ethers.Contract(
  PKPNFTMetadataData.address,
  PKPNFTMetadataData.abi,
  provider
);
