import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';
import inline from '@twind/with-remix/server';
import type { EntryContext } from '@remix-run/react/entry';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  // Add twind styles to the markup
  markup = inline(markup);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
