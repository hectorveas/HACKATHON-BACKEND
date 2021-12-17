const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const path = require('path')

AWS.config.setPromisesDependency();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

async function uploadImages(req: any, res: any, collection: string, elementId?: string): Promise<any> {
    let files = req.files
    let images: any[] = [];
    for (const file of files) {
        let locationImage: string = '';
        const params = {
            ACL: 'public-read',
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: file.buffer,//fs.createReadStream(req.file.path),
            Key: `${collection}/${Date.now()}_${file.originalname.replace(/\s/g, '-')}`,
            fileFilter: function(req: any, file: any, cb: any){
                checkFileType( file, cb );
            }
        };
        const result = await s3.upload(params, async (err: any, data: any) => {
            if (err) {
                console.log('Error occured while trying to upload to S3 bucket', err);
            }
    
            if (data) {
                locationImage = data.Location;
            }
        }).promise();
        images.push(result.Location);
    }
    return images;
}

async function deleteImage(fileName: string | undefined): Promise<any> {
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `imagenes/${fileName}`
    };

    const deleteResult = await s3.deleteObject(params, function(err: any, data: any) {
        if (err) {
          console.log(err);
          // callback(err);
        } else {
          // callback(null);
        }
    });

    return deleteResult;
}

function checkFileType(file: any, cb: any){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype ); if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
}

export default { uploadImages, deleteImage }
