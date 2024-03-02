const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const pinataApiKey = 'c52eafc7dd6d563d8841';
const pinataSecretApiKey = '7f71be7b03a8af29c81e73aac0bf7db08e8b7dc009d708399d74d0a30466f95f';

// Replace with the path to your specific file
const filePath = "./hello.js";

const uploadToPinata = async () => {
    try {
        const fileContent = await fs.readFile(filePath);
        const formData = new FormData();
        formData.append('file', new Blob([fileContent]), { filename: path.basename(filePath) });

        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey,
            },
        });

        console.log('Uploaded to Pinata:', response.data);
    } catch (error) {
        console.error('Error uploading to Pinata:', error.response ? error.response.data : error.message);
    }
};

// Call the upload function
uploadToPinata();
