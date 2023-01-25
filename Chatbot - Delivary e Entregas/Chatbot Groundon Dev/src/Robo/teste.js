const stageMap = new Map();



// whatsapp.on('message', message => {
//     const phoneNumber = message.from.split('@')[0];
//     let stage = stageMap.get(phoneNumber);
//     if (!stage) {
//         stage = 1;
//         stageMap.set(phoneNumber, stage);
//     }
//     switch (stage) {
//         case 1:
//             // Executar código para estágio 1
//             // ...
//             stageMap.set(phoneNumber, 2);
//             break;
//         case 2:
//             // Executar código para estágio 2
//             // ...
//             stageMap.set(phoneNumber, 3);
//             break;
//         // ...
//     }
// });
