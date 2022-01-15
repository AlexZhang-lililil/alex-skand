"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");

const bucketName = "s3-website-bucket"
const bucket = new aws.s3.Bucket(bucketName, {
    website:{
        errorDocument: "index.html",
        indexDocument: "index.html",
    },
});

function publicReadPolicyForBucket(bucketName) {
    return JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Effect: "Allow",
            Principal: "*",
            Action: [
                "s3:GetObject"
            ],
            Resource: [
                `arn:aws:s3:::${bucketName}/*`
            ]
        }]
    })
}

let bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
    bucket: bucket.bucket,
    policy: bucket.bucket.apply(publicReadPolicyForBucket)
});

exports.websiteUrl = bucket.websiteEndpoint;
