import otpGenerator from "otp-generator";

const optService = {
    generateOTP
}

export default optService;

function generateOTP() {
    return otpGenerator.generate(8, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });
}