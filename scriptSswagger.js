import postToYaml from 'post-collection-to-yaml';
import path from 'path'
const __dirname = path.resolve();

const fileIn = './Hackatlon.postman_collection.json';
const fileOut = './swagger.yaml';

const options = {
    url: 'https://hackteam1.herokuapp.com',
    description: 'Swagger del hackteam1',
    title: 'Swagger de on boarding',
    version: '1.0',
    descriptionInfo: 'Swagger del hackteam1',
    email: 'mfberetta@gmail.com'
}

const stringInput = path.join(__dirname, fileIn);
const stringOutput = path.join(__dirname, fileOut);
await postToYaml.convert(stringInput, stringOutput, options);