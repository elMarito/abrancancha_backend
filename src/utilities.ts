export type ResponseObject = {
  statusOk: boolean;
  message: string;
  data?: any;
};

export function ServiceResponseOk(
  message: string,
  data?: any,
  statusOk: boolean = true,
): ResponseObject {
  return { statusOk, message, data };
}

export function today(completa: boolean = false): Date {
  const fechaCompleta = new Date();
  if (completa) return fechaCompleta;
  const fechaSinHora = new Date(
    fechaCompleta.getFullYear(),
    fechaCompleta.getMonth(),
    fechaCompleta.getDate(),
  );
  return fechaSinHora;
}

export function dateEstractGMT( timeFrom: string): Date {   
  return new Date( timeFrom.toString().replace(/GMT.*$/, ''));  
}

//como convertir un hash para que sea valido en una URL
//hash: $2a$10$OAAgeChoe7oWWeqwuihHH.G//nxvmhl.zFhf41w09dspxu0JYPE.S'

// const bcrypt = require('bcrypt');

// // Hash original
// const originalHash = '$2a$10$OAAgeChoe7oWWeqwuihHH.G//nxvmhl.zFhf41w09dspxu0JYPE.S';

export function urlSafeHash(originalHash: string): string {
  // Decodificar el hash
  const decodedHash = Buffer.from(originalHash, 'utf-8');

  // Codificar el hash decodificado utilizando Base64 URL Encoding
  const urlSafeHash = decodedHash
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return urlSafeHash;
}

// console.log(urlSafeHash);
// //----------
// //para hacer lo inverso. No chequeado
// const encodedHash = 'JUUyYSU5RCU4MyU4MCVFNCVCOCU4OSVFNSU5MiU4RSVFNSU4MCU4QiVFNSU4RiU4MSVFNSU5NyU5QyU5RCU4RSVFNyVBRyVFNSVCOCU4MyVFNSVCRCVBRiU5RSVFNyVCNyU4NSVFNSU5MiU4RSVFNSVCRCVBRiU5RSU5QyVFNSU4QiU5NyVFNSVCRCVBRiU5RSU4RSVFNSVCRCVBRiU5RSU4RSVFNSVCRCVBRiU5RSU4RQ';

export function urlUnsafeHash(encodedHash: string): string {
  // Convertir de Base64 URL Encoding a Base64 estándar
  const base64EncodedHash =
    encodedHash.replace(/-/g, '+').replace(/_/g, '/') +
    '=='.substring(0, (4 - (encodedHash.length % 4)) % 4); // Añadir sufijo '=' si es necesario

  // Decodificar de Base64 a hash original
  const decodedHash = Buffer.from(base64EncodedHash, 'base64').toString(
    'utf-8',
  );
  return decodedHash;
}
// console.log(decodedHash); // Output: $2a$10$OAAgeChoe7oWWeqwuihHH.G//nxvmhl.zFhf41w09dspxu0JYPE.S


// const fecha: Date = new Date();
// const fechaString1: string = fecha.toString();
// console.log(fechaString1); // Ejemplo de salida: "Thu May 13 2024 15:30:00 GMT+0530 (hora de India estándar)"

// const fechaString2: string = fecha.toISOString();
// console.log(fechaString2); // Ejemplo de salida: "2024-05-13T10:00:00.000Z"

// const fechaString: string = fecha.toUTCString();
// console.log(fechaString); // Ejemplo de salida: "Thu, 13 May 2024 10:00:00 GMT"