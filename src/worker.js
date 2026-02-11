export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/submit') {
      const data = await request.json();
      const id = crypto.randomUUID();
      await env.SIGNUPS.put(id, JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Optional: handle GET request for dashboard stats
    if(url.pathname === '/stats') {
      const list = await env.SIGNUPS.list(); // fetch all keys
      return new Response(JSON.stringify(list.keys), { status: 200 });
    }

    return new Response("Not found", { status: 404 });
  }
};

