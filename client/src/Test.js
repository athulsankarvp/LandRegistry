// import React, { useState } from 'react';
// // import ipfsAPI from 'ipfs-api';
// const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
// const Test = () => {
//   const [file, setFile] = useState(null);
//   const [hash, setHash] = useState(null);
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
//   const handleUpload = async () => {
//     const buffer = await file.arrayBuffer();
//     const ipfsHash = await ipfs.add(buffer);
//     setHash(ipfsHash[0].hash);
//   };
//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload PDF to IPFS</button>
//       {hash && <p>IPFS hash: {hash}</p>}
//     </div>
//   );
// };
// export default Test;
