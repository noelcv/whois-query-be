import { Request, Response } from 'express';
import net from 'net';

export async function lookUp(req: Request, res: Response) {
  try {
    const sld = 'google';
    const tld = 'com';
    // const sld = req.body.sld;
    // const tld = req.body.tld;
    if (tld === 'com' || tld === 'net') {
      const domain = `${sld}.${tld}`;
      const queryPacket = `${domain}\r\n`;
      const host = 'whois.verisign-grs.com';

      const client = new net.Socket();

      await client.connect(43, host, () => {
        console.log('client connected to whois server: ', client);
        client.write(queryPacket);
      });

      client.on('data', (data) => {
        console.log('client received data: ', data.toString());
        const result = data.toString();
        console.log('🟢 Resolved Result: ', result);
        res.send(result);
        client.destroy();
      });

      client.on('error', (err) => {
        console.log('❌ Error connecting to whois server: ', err);
      });
    } else {
      res.send('TLD not supported');
    }
  } catch (err) {
    console.log(' ❌ Error at lookup Controller: ', err);
    res.status(500);
  }
}
