import dgram from "dgram";
import { v4 as uuidv4 } from "uuid";

// UDP Informations
const ADDRESS = "239.0.0.1";
const PORT = "1234";

const INTERVAL  = 1000;
const INSTRUMENTS = new Map([["piano", "ti-ta-ti"], ["trumpet", "pouet"], ["flute", "trulu"], ["violin", "gzi-gzi"], ["drum", "boum-boum"]]);

if (process.argv.length != 3) {
    console.error("Bad argument, expected instrument");
    process.exit();
}

const sound = INSTRUMENTS.get(process.argv[2]);

if (sound == undefined) {
    console.error("Unknown instrument \"" + process.argv[2] + "\"");
    process.exit();
}

const socket = dgram.createSocket("udp4");
const uuid = uuidv4();

setInterval(() => socket.send(JSON.stringify({uuid:uuid, sound:sound}), PORT, ADDRESS), INTERVAL);
1