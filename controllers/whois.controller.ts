import { Request, Response } from 'express';
import net from 'net';

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

/*
DNS names can contain only alphabetical characters (A-Z), numeric characters (0-9), the minus sign (-), and the period (.).
Period characters are allowed only when they are used to delimit the components of domain style name
*/
function validateSld(sld: string): boolean {
  let regex = new RegExp(/^(?!\.)(?!.*\.$)(?!.*\.\.)[a-zA-Z0-9.]+$/);
  /**
   * ^(?!\.) -- negative look ahead to make sure the first character is not a period
   * (?!.*\.$) -- last character is not a period
   * (?!.*\.\.) -- make sure there are not two periods in a row
   * [a-zA-Z0-9-.]+$ -- only allow letters, numbers, periods, and hyphens
   */

  let isValidInput = regex.test(sld);
  let hasValidLength = sld.length > 0 && sld.length < 64;
  return isValidInput && hasValidLength ? true : false;
}

/*only allow for .com and .net*/
function validateTld(tld: string): boolean {
  return tld === 'com' || tld === 'net' ? true : false;
}
