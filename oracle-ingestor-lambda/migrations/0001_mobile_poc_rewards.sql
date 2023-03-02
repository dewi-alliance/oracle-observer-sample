CREATE TABLE mobile_poc_rewards (
    amount bigInt NOT NULL,
    epoch_end date NOT NULL,
    hotspot_key varchar(52) NOT NULL,
    cbsd_id varchar(52) NOT NULL,
    PRIMARY KEY (epoch_end, hotspot_key, cbsd_id)
);