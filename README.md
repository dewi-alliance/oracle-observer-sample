# Oracles S3 Observer Sample App

## Repo Overview

This repo serves as a building block that the community can use for creating applications and APIs around the S3 data that the Helium oracles create.

This repo is broken into two pieces:

- The `oracle-ingestor-lambda` pulls data from S3 buckets, decodes it, transforms it, and pushes it into a PostgreSQL database
- The `oracle-observer-api` serves this transformed data as json
