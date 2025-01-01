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


-- 연습문제 1
CREATE DATABASE dave;
use dave;

CREATE TABLE mytable(
	id int unsigned not null auto_increment,
    name varchar(50) not null,
    modelnumber varchar(15) not null,
    series varchar(30) not null,
    primary key(id)
);
show tables;
desc mytable;

ALTER TABLE mytable MODIFY COLUMN name varchar(20) not null;
ALTER TABLE mytable CHANGE COLUMN modelnumber model_num varchar(10) not null;
ALTER TABLE mytable CHANGE COLUMN series model_type varchar(10) not null;
desc mytable;

-- 연습문제2
drop table if exists mytable;

create table model_info(
	id int unsigned not null auto_increment,
    name varchar(20) not null,
    model_num varchar(10) not null,
    model_type varchar(10) not null,
    primary key(id)
);
desc model_info;
