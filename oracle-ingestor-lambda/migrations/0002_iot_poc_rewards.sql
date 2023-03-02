CREATE TABLE iot_poc_rewards (
    beacon_amount bigInt NOT NULL,
    witness_amount bigInt NOT NULL,
    epoch_end date NOT NULL,
    hotspot_key varchar(52) NOT NULL,
    PRIMARY KEY (epoch_end, hotspot_key)
);