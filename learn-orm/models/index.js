'use strict';
// 경로를 위한 내장 모듈
const path = require('path');
// sequelize 패키지
const Sequelize = require('sequelize');

// 개발 모드 환경설정
const env = process.env.NODE_ENV || 'development';
// 데이터 베이스 연결 환경설정
// ../config/config.json에서 해당 env를 키로 가지는 데이터를 가져온다.
const config = require(path.join(__dirname,'..','config','config.json'))[env];

// 데이터베이스 객체
const db = {}; // 여기와 실제 데이터베이스가 연결된다.

// 데이터베이스 연결정보로 시퀄라이즈 ORM 객체를 생성한다
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 데이터베이스와 ORM을 매핑한다.
// 이제부터 db를 통해 데이터베이스를 관리할 수 있다.
db.sequelize = sequelize; // db객체에 sequelize라는 프로퍼티 추가
db.Sequelize = Sequelize;

// 만든 db 객체를 exports 한다.
module.exports = db;