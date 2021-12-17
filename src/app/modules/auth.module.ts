import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function checkAuth(req: any, entity: string) {
  const decoded: any = decodeHeader(req);
  if ((decoded.entity.toLowerCase() !== entity) && (entity !== 'both')) {
    throw new Error('No Access');
  }
}

function sign(payload: any){
  return jwt.sign(payload, `${process.env['SECRET_KEY']}`);
}

function verify(token: string){
  return jwt.verify(token, `${process.env['SECRET_KEY']}`);
}

function encrypt(data: string){
  return bcrypt.hash(data, 5);
}

function decryptAndCompare(data: string, encrypted: string){
  return bcrypt.compare(data, encrypted);
}

function decodeHeader(req: any) {
  if (req.headers.token) {
    const token = req.headers.token;
    const decoded = verify(token);
    return decoded;
  } else {
    throw new Error(`The request doesn't have the token header`);
  }
}

export default { sign, verify, encrypt, decryptAndCompare, checkAuth };
