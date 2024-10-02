// // FileUpload.jsx
// import React from 'react';
// import { getStorage, ref, uploadBytes } from 'firebase/storage';
// import { app } from '../firebase'; // Altere o caminho conforme necessário

// // Inicializa o Firebase Storage
// const storage = getStorage(app);

// const FileUpload = () => {
//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             uploadFile(selectedFile);
//         }
//     };

//     const uploadFile = (file) => {
//         // Referência para o arquivo no Firebase Storage
//         const storageRef = ref(storage, 'Dados/dados.xlsx');

//         // Fazer o upload do arquivo, substituindo o existente
//         uploadBytes(storageRef, file)
//             .then(() => {
//                 console.log('Arquivo substituído com sucesso!');
//                 alert('Arquivo atualizado com sucesso!');
//             })
//             .catch((error) => {
//                 console.error('Erro ao substituir arquivo:', error);
//                 alert('Erro ao atualizar o arquivo.');
//             });
//     };

//     return (
//         <div>
//             <input type="file" accept=".xlsx" onChange={handleFileChange} />
//             <p>Selecione um arquivo para substituir o existente no bucket.</p>
//         </div>
//     );
// };

// export default FileUpload;
