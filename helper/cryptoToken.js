import crypto from 'crypto';

const generateToken = (length) => {
    return crypto.randomBytes(length).toString("hex");
  };

  export default generateToken;