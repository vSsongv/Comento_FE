const express = require('express');
const server = require('http').createServer(express);
const router = express.Router();
const io = require('socket.io')(server);
const checkAuth = require('../middlewares/auth').checkToken;

// 질문자는 질문함과 동시에 소켓에 연결? 아니면 답변자 매칭시 연결? 후자가 좀 더 리소스 낭비가 적겠지..?
// 
// 답변자 매칭시 방 번호 부여와 동시에 소켓 연결(질문자는 먼저 연결된 상태, 답변자는 추후에)
// 채팅방으로 생성시 질문자 정보 가져와야함
// 메세지를 전송하고 받아야한다.
// 1:1 채팅방 구현

