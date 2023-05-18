import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import { IMailTo } from '@interfaces/IMailTo';

const client = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-west-2',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        }
    }),
});

const from = {
    name: process.env.SES_NAME as string,
    address: process.env.SES_EMAIL as string,
}

const mailService = {
    sendOtp,
    sendNewSessionNotification
}

export default mailService;

async function sendOtp(to: IMailTo, code: string | number) {
    return client.sendMail({
        from,
        to,
        subject: `${code} tu codigo de acceso`,
        html: `${code} tu codigo de acceso`,
    });
}

async function sendNewSessionNotification(to: IMailTo, ip: string, userAgent: string, date: Date) {
    return client.sendMail({
        from,
        to,
        subject: `Nuevo acceso a su cuenta`,
        html: `Se ha autorizado un nuevo acceso a su cuenta em ${date}, ip: ${ip}, navegador: ${userAgent}`,
    });
}
