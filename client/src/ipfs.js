import {create} from 'ipfs-http-client'
// import {Buffer} from 'buffer'
// const projectId = process.env.REACT_APP_PROJECT_ID;
// const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

// const ipfs =create({
//     host: 'localhost',
//     port: 5001,
//     protocol: 'http',
//     // headers: {
//     //     authorization: auth,
//     // },
// });
const ipfs =create({
    host: 'http://127.0.0.1',
    port: 5001,
    protocol: 'http',
    mode:'cors',

});

export default ipfs;