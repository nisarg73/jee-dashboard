load data local infile "/home/nisarg73/Downloads/API_Data_v3.csv" into table api_item
fields terminated by ','
lines terminated by '\n'
ignore 1 lines
(year, round_no, quota, pool, institute_full, institute_short, institute_location, program_name, program_duration, degree_full, degree_short, category, opening_rank, closing_rank, is_preparatory);

\copy api_item(year, round_no, quota, pool, institute_full, institute_short, institute_location, program_name, program_duration, degree_full, degree_short, category, opening_rank, closing_rank, is_preparatory) from '/home/nisarg73/Downloads/API_Data_v3.csv' DELIMITER ',' CSV HEADER;
