import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';

const getFirebaseParams = (configService: ConfigService) => {
    const adminConfig = {
        "type": configService.get<string>('FIREBASE_TYPE'),
        "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
        "privateKeyId": configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
        "privateKey": configService.get<string>('FIREBASE_KEY').replace(/\\n/g, '\n'),
        "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        "clientId": configService.get<string>('FIREBASE_CLIENT_ID'),
        "authUri": configService.get<string>('FIREBASE_AUTH_URI'),
        "tokenUri": configService.get<string>('FIREBASE_TOKEN_URI'),
        "authProviderX509CertUrl": configService.get<string>('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
        "clientC509CertUrl": configService.get<string>('FIREBASE_CLIENT_C509_CERT_URL'),
    };
    return adminConfig;
}


export default getFirebaseParams;