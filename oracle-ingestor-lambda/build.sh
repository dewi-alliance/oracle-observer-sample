#!/bin/sh

rm -rf target lambda.zip bootstrap

cargo lambda build --release --arm64
cp target/lambda/oracle-ingestor-lambda/bootstrap ./bootstrap
zip lambda.zip bootstrap