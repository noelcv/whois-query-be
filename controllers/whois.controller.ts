import { Request, Response } from 'express';
import net from 'net';
import { validateSld } from './controller.utils/validateSld.util';
import { validateTld } from './controller.utils/validateTld.util';

export async function lookUp(req: Request, res: Response) {
  try {
    const sld = 'careers..centralnicgroup';
    const tld = 'xyz';
    const isValidSld = validateSld(sld);
    const isValidTld = validateTld(tld);
    // const sld = req.body.sld;
    // const tld = req.body.tld;
    if (isValidSld && isValidTld) {
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
    } else if (!isValidSld && !isValidTld) {
        res.send(`❌ You are a troll! "${sld}.${tld}" is not a valid input (and you probably know it...)`);
        res.status(400)
    } else if (!isValidSld) {
      res.send(`❌ Invalid SLD: ${sld}. Please, try again`);
      res.status(400)
    } else if (!isValidTld) {
      res.send(`❌ Invalid TLD: ${tld}. At the moment, only .COM and .NET domain names are supported`);
      res.status(400)
     } else {
      res.send('Domain not supported');
      res.status(400)
    }
  } catch (err) {
    console.log(' ❌ Error at lookup Controller: ', err);
    res.status(500);
  }
}
