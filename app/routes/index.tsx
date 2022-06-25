import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';

export const Loader = () => {};

export const Index = () => {
  const navigate = useNavigate();

  const handleConnect = async () => {
    // @ts-ignore window.ethereum injected from metamask; no need to type rn
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const acc = await provider.send('eth_requestAccounts', []);
    console.log({ acc, provider });

    if (acc && acc.length > 0) {
      navigate('/tickers');
    }
  };

  useEffect(() => {
    const isMetaMaskConnected = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts && accounts.length > 0) navigate('/tickers');
    };

    isMetaMaskConnected();
  }, [navigate]);

  return (
    <div className="h-full flex place-content-center">
      <button
        onClick={handleConnect}
        className="mt-48 inline-block bg-emerald-800 bg-opacity-60 py-2 px-4 border border-transparent rounded-md text-base font-medium text-emerald-100 hover:bg-opacity-70 active:bg-opacity-80"
      >
        🔓 Unlock Wallet
      </button>
    </div>
  );
};

export default Index;
