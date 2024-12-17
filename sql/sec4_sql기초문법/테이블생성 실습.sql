create database if not exists customer_db;

use customer_db;

create table if not exists customer (
	no integer not null,
    name char(20) not null,
    age tinyint,
    phone varchar(20),
    email varchar(20) not null,
    address varchar(50),
    primary key(no)
);