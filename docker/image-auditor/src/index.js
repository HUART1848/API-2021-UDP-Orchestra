import dgram from "dgram";
import net from "net";

// Network informations
const TCP_PORT = "2205"

// UDP Informations
const UDP_ADDRESS = "239.0.0.1";
const UDP_PORT = "1234";

const INTERVAL  = 5000;
// Order is reversed compared to the musician map
const INSTRUMENTS = new Map(Array.from([["piano", "ti-ta-ti"], ["trumpet", "pouet"], ["flute", "trulu"], ["violin", "gzi-gzi"], ["drum", "boum-boum"]], e => [e[1], e[0]]));

let musicians = new Map();

function handleMusician(msg) {
    let now = Date.now();

    let sound = JSON.parse(msg);
    let musician = musicians.get(sound.uuid);

    if (musician != undefined && now - musician.lastSeen <= INTERVAL)
        musicians.set(sound.uuid, {instrument:musician.instrument, firstSeen:musician.first, lastSeen:now});
    else
        musicians.set(sound.uuid, {instrument:INSTRUMENTS.get(sound.sound), firstSeen:now, lastSeen:now});
}

function handleConnection(socket) {
    let now = Date.now();

    let msg = JSON.stringify([...musicians].filter(([key, value]) =>  {
        if (now - value.lastSeen > INTERVAL) {
            musicians.delete(key);
            return false;
        }
        return true;
    }).map(([key, value]) => {
        return {uuid:key, instrument:value.instrument, activeSince: new Date(value.firstSeen)};
    }));

    socket.write(msg + "\n");
    socket.end();
}

const udpSocket = dgram.createSocket("udp4");
const server = net.createServer();

udpSocket.on("message", handleMusician);
udpSocket.bind(UDP_PORT, () => {
    udpSocket.addMembership(UDP_ADDRESS);
});

server.listen(TCP_PORT, "0.0.0.0");
server.on("connection", handleConnection);
