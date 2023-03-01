# Helium Oracle Observer Lambda

This sample oracle observer lambda parses and uploads Mobile and LoRa PoC rewards to a PostgreSQL database.

## AWS Setup

This lambda ingestor should be setup in an AWS environment. You can follow the below instructions on how to properly setup your AWS enviroment.

0. **AWS Region**
   - To reduce costs all of the following AWS services should be setup in us-west-2 (the same region as the Foundation S3 replication buckets)
1. **Create Database**
   - Create a PostgreSQL database in either AWS RDS or your preferred environment.
1. **Create S3 Bucket**
   - Create an AWS S3 bucket that will receive duplicates of the oracle S3 data.
1. **Setup Lambda**
   - Run `sh build.sh`. This will build the ingestor and create a `lambda.zip` file.
   - Create a new lambda AWS lambda function with a custom Amazon Linux 2 runtime and arm64 architecture.
   - (Optional): If you are using RDS, make sure add your lambda function to the same VPC and Security Group as your RDS instance.
   - Upload the `lambda.zip` file to your lambda instance.
   - Add the DATABASE_URL as an environment variable to the lambda.
   - Note: See this [aws-lambda-rust-runtime](https://github.com/awslabs/aws-lambda-rust-runtime#deployment) repo as a reference.
1. **Create AWS S3 Events**
   - From the S3 bucket's properties tab, create a new event notification.
   - Set the prefix to `radio_reward_share.`, set the event type to `s3:ObjectCreated:*`, and set the destination to the lambda you created above.
   - Create another event with the prefix of `gateway_reward_share.`
1. **Sync data from Helium Foundation S3**

   - See [following documentation](https://docs.helium.com/oracles/oracle-data/).
   - For this sample application you only need to sync `radio_reward_share.*` and `gateway_reward_share.*` files.

Once you have completed the above setup steps, you should be copying the relevant S3 data we care about from the Helium Foundation buckets to your personal bucket. That in turn will trigger the lambda function we have defined. This lambda function parses the zipped protobufs and allows you to extract the data you find relevant. In this example, it for instance extracts the mobile and lora poc rewards and uploads them to the PostgreSQL database we setup.

## Parsing a file

- **Map File to Proto** - To figure out the mapping of filename to data you should refer to the [oracles repo](https://github.com/helium/oracles). For instance, by viewing the `mobile_rewards` folder we can see that the `radio_reward_share.*` files contain data on RadioRewardShares. We can in turn follow the proto link to figure out the type definition of a RadioRewardShare.
- **Parse File**: We can then use this mapping of proto to file to decode the given file. In our sample code we for instance run `let reward = RadioRewardShare::decode(msg)?;` in order to read a `radio_reward_share.*` file.
- **Transform Data**: Once a file is parsed we are then free to convert it to our desired format. In this example we convert the timestamps (in seconds) to dates and convert the hotspot keys from byte arrays to public keys strings.
