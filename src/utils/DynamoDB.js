import * as AWS from 'aws-sdk'

AWS.config.update({
    credentials: new AWS.Credentials({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    }),
    region: "eu-west-2"
});

var docClient = new AWS.DynamoDB.DocumentClient();

export const fetchDelegators = async () => {
    var params = {
        TableName: "harmoforce_delegators",
        ProjectionExpression: "address, amount, #isVal",
        FilterExpression: "#isVal = :bool",
        ExpressionAttributeNames: {
            "#isVal": "isValidator",
        },
        ExpressionAttributeValues: {
            ":bool": false
        }
    };

    // docClient.scan(params, function (err, data) {
    //     var loop = true
    //     while(loop) {
    //         if (err) {
    //         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    //         } else {
    //             // print all the movies
    //             console.log("Scan succeeded.");
    //             data.Items.forEach(function(delegator) {
    //             console.log(
    //                     delegator.address + ": ",
    //                     delegator.amount);
    //             });
        
    //             // continue scanning if we have more movies, because
    //             // scan can retrieve a maximum of 1MB of data
    //             if (typeof data.LastEvaluatedKey != "undefined") {
    //                 console.log("Scanning for more...");
    //                 params.ExclusiveStartKey = data.LastEvaluatedKey;
    //             } else {
    //                 loop = false
    //             }
    //         }
    //     }
    // })
    const data = await docClient.scan(params).promise();
    return data.Items
}

export const getValidatorAddress = async () => {
    var params = {
        TableName: "harmoforce_delegators",
        ProjectionExpression:"address, #isVal",
        FilterExpression: "#isVal = :bool",
        ExpressionAttributeNames:{
            "#isVal": "isValidator"
        },
        ExpressionAttributeValues: {
            ":bool": true
        }
    };

    const data = await docClient.scan(params).promise();
    return data.Items
}

export const createDelegator = async (address) => {
    var params = {
        TableName: "harmoforce_delegators",
        Item: {
            "address": address,
            "amount": 0,
            "isValidator": false
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export const deleteDelegator = async (address) => {
    var params = {
        TableName: "harmoforce_delegators",
        Key: {
            "address": address
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}