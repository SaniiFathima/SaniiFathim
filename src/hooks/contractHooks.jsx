import { useAccount } from "wagmi";
import SubContractAbi from "../../artifacts/contracts/SubContract.sol/SubContract.json";
import { ethers } from "ethers";
import { useMemo } from "react";

export function useInstance() {
  const { address } = useAccount();

  const contractInstance = useMemo(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
      "0x80b701E9D06902442eaFB31cdF693903Af5b3BDC",
      SubContractAbi.abi,
      signer
    );
  }, []);
  
  return { contractInstance, address };
}
