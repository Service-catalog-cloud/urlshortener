import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-2'
})

const docClient = new AWS.DynamoDB.DocumentClient()

const table = process.env.TABLE_NAME as string || "defaulttablename"
// creates a new url map
export function newUrl(url: string, token: string) {
    

    let params = {
        TableName: table,
        Item: {
            Url: url,
            token: token
        }
    }

    return docClient.put(params).promise()
}

// gets the url from the partition key token variable
export function getUrl(token: string) {

    let params = {
        TableName: table,
        Key: {
            'token': token
        }
    }

    return docClient.get(params).promise()
}