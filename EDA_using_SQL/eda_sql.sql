SELECT * FROM electronicsdata

-- Disable safe updates
SET sql_safe_updates = 0;

SHOW VARIABLES LIKE 'secure_file_priv';

SHOW VARIABLES LIKE 'secure_file_priv';

SHOW VARIABLES LIKE 'secure_file_priv';


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/ElectronicsData.csv'
INTO TABLE electronicsdata
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- Verify data
SELECT * FROM electronicsdata;

-- VIEW OF THE DATA
SELECT * FROM electronicsdata
select count(distinct title) from electronicsdata