import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response("", {
      headers: {
        'set-cookie': [
          `disco_refresh_token=deleted; Path=/; Max-Age=-1`,
          `disco_access_token=deleted; Path=/; Max-Age=-1`,
        ],
        Location: '/'
      },
      status: 302
    })
  }