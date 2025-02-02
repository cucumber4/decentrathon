import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x71eb595C8Da789699ffbC9b7d3bf8ab83ADb06Bb"; // Замените на ваш адрес контракта
const ABI = [
  "function createPoll(string _name, string[] memory _candidates) public",
  "function vote(uint256 pollId, string memory candidate) public",
  "function getResult(uint256 pollId, string memory candidate) public view returns (uint256)",
  "function pollCount() public view returns (uint256)"
];

const SEPOLIA_CHAIN_ID = '0xaa36a7'; // 11155111 в hex

export async function getContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask не установлен!");
  }

  // Проверяем текущую сеть
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();

  // eslint-disable-next-line no-undef
  if (network.chainId !== BigInt(11155111)) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (error) {
      alert('Пожалуйста, переключитесь на сеть Sepolia в MetaMask');
      throw error;
    }
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return contract;
}