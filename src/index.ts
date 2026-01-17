import express from 'express';
import { getClientIP, isIPv4, isIPv6 } from './utils';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const host = req.headers.host?.split(':')[0]; // remove port if any
  const ip = getClientIP(req);
  if (!ip) {
    res.status(400).send('No IP detected');
    return;
  }
  if (host === 'ip4.jine.se') {
    if (!isIPv4(ip)) {
      res.status(400).send('');
      return;
    }
  } else if (host === 'ip6.jine.se') {
    if (!isIPv6(ip)) {
      res.status(400).send('');
      return;
    }
  }
  // For ip.jine.se or others, respond with the IP
  const accept = req.headers.accept;
  if (accept && accept.includes('application/json')) {
    res.json({ ip });
  } else {
    res.type('text/plain').send(ip);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});