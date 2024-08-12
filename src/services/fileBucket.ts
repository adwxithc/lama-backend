import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

import crypto from 'crypto';


export class FileBucket {
    BUCKET_NAME = process.env.BUCKET_NAME as string;
    BUCKET_REGION = process.env.BUCKET_REGION as string;
    AWS_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY as string;
    AWS_ACCESS_KEY = process.env.S3_ACCESS_KEY as string;
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: this.AWS_ACCESS_KEY,
                secretAccessKey: this.AWS_SECRET_KEY,
            },
            region: this.BUCKET_REGION,
        });
    }

    randomImageName(bytes=32): string {
        return crypto.randomBytes(bytes).toString('hex');
    }

    async uploadImage({
        mimetype,
        imageBuffer,
    }: {
        mimetype: string;
        imageBuffer: Buffer;
    }) {
        const imageName = this.randomImageName();

        const command = new PutObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key: imageName,
            Body: imageBuffer,
            ContentType: mimetype,
        });
        await this.s3.send(command);
        return imageName;
    }

    getFileAccessURL(Key: string) {

        if(!Key) return '';
        const url= `https://${this.BUCKET_NAME}.s3.${this.BUCKET_REGION}.amazonaws.com/${Key}`;
        return url;
    }

    async deleteFile(Key: string): Promise<boolean> {

        const command = new DeleteObjectCommand({
            Bucket: this.BUCKET_NAME,
            Key: Key,
        });
        const res = await this.s3.send(command);
        
        return true;
    }
}
const fileBucket = new FileBucket()
export default fileBucket;