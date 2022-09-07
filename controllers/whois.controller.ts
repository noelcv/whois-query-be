import { Request, Response } from 'express';
import net from 'net';
import { validateSld } from './controller.utils/validateSld.util';
import { validateTld } from './controller.utils/validateTld.util';
import QueryModel from '../models/query.model';

export async function lookUp(req: Request, res: Response) {
  try {
    const sld = req.body.sld;
    const tld = req.body.tld;
    const isValidSld = validateSld(sld);
    const isValidTld = validateTld(tld);

    if (isValidSld && isValidTld) {
      const domain = `${sld}.${tld}`;
      const queryPacket = `${domain}\r\n`;
      const host = 'whois.verisign-grs.com';

      const client = new net.Socket();

      await client.connect(43, host, () => {
        client.write(queryPacket);
      });

      client.on('data', (data) => {
        const result = data.toString();
        res.send(result);
     
        const payload = {
          domainName: domain,
          log: result,
        };
        
        addLog(payload);
        res.status(200);
        client.destroy();
      });

      client.on('error', (err) => {
        console.log('❌ Error connecting to whois server: ', err);
      });
    } else if (!isValidSld && !isValidTld) {
      res.send(
        `❌ You are a troll! "${sld}.${tld}" is not a valid input (and you probably know it...)`
      );
      res.status(400);
    } else if (!isValidSld) {
      res.send(`❌ Invalid SLD: ${sld}. Please, try again`);
      res.status(400);
    } else if (!isValidTld) {
      res.send(
        `❌ Invalid TLD: ${tld}. At the moment, only .COM and .NET domain names are supported`
      );
      res.status(400);
    } else {
      res.send('Domain not supported');
      res.status(400);
    }
  } catch (err) {
    console.log(' ❌ Error at lookup Controller: ', err);
    res.status(500);
  }
}

//TODO: move this to a types directory
type LogRecord = {
  domainName: string;
  log: string;
};

export async function addLog(payload: LogRecord) {
  try {
    console.log('payload inside addLog: ', payload);
    const data = await QueryModel.create(payload);
    console.log(data, 'data inside addLog');
    if (data) console.log('🚀 Log added to DB', data);
  } catch (err) {
    console.log('Error storing the query log to database', err);
  }
}
