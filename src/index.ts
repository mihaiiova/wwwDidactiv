interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Canonical host: redirect www → apex, always over HTTPS.
    if (url.hostname === 'www.didactiv.ro') {
      url.protocol = 'https:';
      url.hostname = 'didactiv.ro';
      return Response.redirect(url.toString(), 301);
    }

    // Enforce HTTPS on the apex domain.
    if (url.hostname === 'didactiv.ro' && url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // Everything else is served from the static assets.
    return env.ASSETS.fetch(request);
  },
};
