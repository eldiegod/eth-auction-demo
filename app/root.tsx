import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  PrefetchPageLinks,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { MetaFunction } from '@remix-run/react/routeModules.js';

import install from '@twind/with-remix';
import config from '../twind.config.js';

install(config);

export const meta: MetaFunction = () => {
  return { title: 'NFT listing Demo' };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="bg-emerald-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div className="w-full py-2 flex items-center justify-between">
              <div className="flex items-center">
                <a href="#top">
                  <span className="sr-only">BlockSwap</span>
                  <img
                    src="https://brand.blockswap.network/static/media/logo-black.13afc5b5.svg"
                    alt="BlockSwap.Network Logo"
                    style={{ height: '65px' }}
                  />
                </a>
                <div className="hidden ml-10 space-x-8 lg:block"></div>
              </div>
              <div className="ml-10 space-x-4">
                <button className="mx-auto inline-block bg-emerald-800 bg-opacity-60 py-2 px-4 border border-transparent rounded-md text-base font-sm text-emerald-100 hover:bg-opacity-70 active:bg-opacity-80">
                  My Account
                </button>
              </div>
            </div>
          </nav>
        </header>
        <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <PrefetchPageLinks page="/tickers" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
