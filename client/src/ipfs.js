import {create,CID} from 'ipfs-http-client'
import {Buffer} from 'buffer'
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

const ipfs =create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

export default ipfs;