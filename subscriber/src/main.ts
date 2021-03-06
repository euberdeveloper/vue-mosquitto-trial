import * as config from './config.json';
import * as os from 'os';
import { MqttSub } from './subscriber';

const PROTOCOL = process.argv[2] || 'MQTT';

const conf = PROTOCOL === 'MQTT' ? config.mqtt : config.ws;
const uri = `${conf.protocol}://${conf.host}:${conf.port}`;

console.log(" OS: " + os.type() + " " + os.release() + " (" + os.arch() + ")");
console.log("RAM: " + os.totalmem() / 1048576 + " MB (total), " + os.freemem() / 1048576 + " MB (free)");
console.log("CPU: " + os.cpus()[0].speed + " MHz " + os.cpus()[0].model + "\n");

new MqttSub(uri, conf.topic);