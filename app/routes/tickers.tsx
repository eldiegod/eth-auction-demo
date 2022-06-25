import { useLoaderData } from '@remix-run/react';
import type { OperationResult } from '@urql/core';
import { gql, createClient } from '@urql/core';
import web3 from '../web3.server';

const client = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/vince0656/brand-central',
});

export const loader = async (): Promise<OperationResult<TickersResponse>> => {
  const result = await client
    .query<TickersResponse>(TickersQuery)
    .toPromise()
    .then((result) => {
      result.data?.tickers.forEach((ticker) => {
        ticker.shbBid = web3.utils.fromWei(ticker.shbBid);
      });

      return result;
    });
  return result;
};

export default function Tickers() {
  const { data } = useLoaderData<OperationResult<TickersResponse>>();
  console.log({ data });

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold decoration-emerald-00 text-slate-100">Brand Central Auction</h2>
        <p className="mt-8 text-justify max-w-xl mx-auto">
          Blockswap is giving the first opportunity to claim a StakeHouse name on mainnet to SHB holders.
          <br />
          <br />
          The auction will run for 5 days.
          <br />
          <br />
          Each day 10 StakeHouse names can be proposed on a first come first serve basis.
          <br />
          <br />
          In the last 200 blocks (approx 50 minutes) each additional bid will increase the time remaining by
          100 blocks (approx 25 minutes) until someone loses the battle.
          <br />
          <br />
          Minimum Bid increase is 2 SHB.
          <br />
          <br />
          Additional details on the auction{' '}
          <a
            href="https://blog.blockswap.network/brand-central-auction-how-to-guide-3ac1f66564db"
            className="underline hover:no-underline"
          >
            here
          </a>
          . Read FAQ{' '}
          <a
            href="https://blockswap.notion.site/blockswap/FAQ-Brand-Central-Auction-a5924cb32a114bbba53c0b27a77e1230"
            className="underline hover:no-underline"
          >
            here
          </a>
          .
        </p>

        <h3 className="mt-24 text-xl font-thin text-slate-400">The current auction has finalized.</h3>
      </div>
      <div className="mt-16 flex flex-wrap justify-center gap-x-14 gap-y-20">
        {data?.tickers.map((ticker) => (
          <div
            key={ticker.id}
            className="flex flex-col drop-shadow-lg items-center justify-center px-2 py-2 w-56  rounded-lg bg-gradient-to-r from-cyan-900 to-emerald-800"
          >
            <div className="flex items-center justify-center w-full h-48 bg-slate-500 rounded">
              <img
                className={'h-16'}
                src={ticker.imageURI || 'https://etherscan.io/images/main/empty-token.png'}
                alt={ticker.name}
              ></img>
            </div>
            <div className="mt-2 w-full text-emerald-100">
              <div className="flex justify-between">
                <span className="uppercase text-2xl font-bold">{ticker.id}</span>
                <div>
                  <span className="text-lg font-bold">{ticker.shbBid}</span>
                  <span className="text-xs font-thing"> SHB</span>
                </div>
              </div>
              <div className="">
                <span className="text-sm font-thin italic">
                  {ticker.numberOfBidsReceived +
                    (parseFloat(ticker.numberOfBidsReceived) > 1 ? ' bids' : ' bid')}
                </span>
              </div>
              <div className="">
                <span className="text-emerald-400 font-thin text-sm">Winner: </span>
                <a
                  href="https://blockswap.notion.site/blockswap/FAQ-Brand-Central-Auction-a5924cb32a114bbba53c0b27a77e1230"
                  className="underline hover:no-underline"
                >
                  {shortenAddress(ticker.bidder, 6, 4)}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const TickersQuery = gql`
  query {
    tickers(first: 50) {
      id
      shbBid
      bidder
      biddingEnd
      imageURI
      name
      description
      numberOfBidsReceived
      nftClaimed
    }
  }
`;

type TickersResponse = {
  tickers: Array<{
    id: string;
    shbBid: string;
    bidder: string;
    biddingEnd: string;
    imageURI: string;
    name: string;
    description: string;
    numberOfBidsReceived: string;
    nftClaimed: boolean;
  }>;
};

export const shortenAddress = (text: string, firstLettersAmount: number, lastLettersAmount: number) => {
  const arrayFromString = text.split('');
  const firstLetters = arrayFromString.slice(0, firstLettersAmount).join('');
  const lastLetters = arrayFromString.slice(arrayFromString.length - 1 - lastLettersAmount).join('');
  return `${firstLetters}...${lastLetters}`;
};
