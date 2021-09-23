import * as fs from 'fs';
import pkg from '@aws-sdk/client-ec2';
const {EC2Client, DescribeInstancesCommand} = pkg;

/**
 * Extracts all instances and their tags from a specified region
 *
 * @param {string} region AWS region
 * @return {Object} with a tree path as a key and instance type as a value
 */
async function getEC2Instances(region='us-east-1') {
  const client = new EC2Client({region: region});
  const command = new DescribeInstancesCommand({
    'Filters': [],
  });
  const instances = {};

  try {
    const respond = await client.send(command);
    for (const reservation of respond.Reservations) {
      for (const instance of reservation.Instances) {
        const env = instance.Tags.filter((tag) => tag.Key.match(/env/i));
        const service = instance.Tags.filter((tag) => tag.Key.match(/service/i));
        if (env.length > 0 && service.length > 0) {
          const key = `${env[0].Value}.${service[0].Value}.${instance.InstanceId}`;
          instances[key] = instance.InstanceType;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
  return instances;
}

/**
 * Function reads a local cvs file with a prices per instance type.
 * For now, only prices for us-east-1 region are supported supported.
 *
 * @return {Object} with an instace type as a string and a price as a value
 */
function getAWSPrices() {
  const data = fs.readFileSync('./price_db/us-east-1.csv', 'utf8').split('\n');
  return Object.fromEntries(data.map((el) => el.split(',')));
}

export {getEC2Instances, getAWSPrices};
