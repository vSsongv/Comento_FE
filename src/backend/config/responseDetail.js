module.exports = {
  //SUCCESS
  SUCCESS: {
    isSuccess: true,
    code: 1000,
    message: "성공",
  },
  SIGNUP_SUCCESS: {
    isSuccess: true,
    code: 1100,
    message: "회원가입에 성공하였습니다.",
  },
  SIGNIN_SUCCESS: {
    isSuccess: true,
    code: 1101,
    message: "로그인에 성공하였습니다",
  },
  UPDATE_PASSWORD: {
    isSuccess: true,
    code: 1102,
    message: "비밀번호를 변경하였습니다.",
  },
  AVAILABLE_EMAIL: {
    isSuccess: true,
    code: 1103,
    message: "사용가능한 이메일입니다.",
  },
  AVAILABLE_PHONE: {
    isSuccess: true,
    code: 1104,
    message: "사용가능한 번호입니다.",
  },
  AVAILABLE_NICKNAME: {
    isSuccess: true,
    code: 1105,
    message: "사용가능한 닉네임입니다.",
  },
  SEND_EMAIL: {
    isSuccess: true,
    code: 1106,
    message: "멘토 권한 요청 이메일을 성공적으로 전송하였습니다.",
  },
  POST_QUESTION: {
    isSuccess: true,
    code: 1107,
    message: "질문을 게시하였습니다.",
  },
  GET_QUESTION: {
    isSuccess: true,
    code: 1108,
    message: "질문 목록을 가져왔습니다.",
  },
  MODIFY_SUCCESS: {
    isSuccess: true,
    code: 1109,
    message: "질문을 수정하였습니다",
  },
  DELETE_QUESTION: {
    isSuccess: true,
    code: 1110,
    message: "질문을 삭제하였습니다",
  },
  GET_CHAT: {
    isSuccess: true,
    code: 1111,
    message: "채팅 목록을 가져왔습니다.",
  },
  MODIFY_USER_SUCCESS: {
    isSuccess: true,
    code: 1112,
    message: "비밀번호를 초기화하였습니다.",
  },
  CONNECT_MENTORING: {
    isSuccess: true,
    code: 1113,
    message: "멘토링을 체결하였습니다",
  },
  UNDERWAY_MENTORING: {
    isSuccess: true,
    code: 1114,
    message: "진행중인 질문 리스트입니다",
  },
  POST_MSG: { isSuccess: true, code: 1115, message: "채팅을 보냈습니다." },
  UPLOAD_SUCCESS: {
    isSuccess: true,
    code: 1116,
    message: "이미지 파일 업로드를 성공하였습니다.",
  },
  GET_QUESTIONINFO: {
    isSuccess: true,
    code: 1117,
    message: "질문에 대한 정보를 가져왔습니다.",
  },
  IMAGE_UPLOAD_SUCCESS: {
    isSuccess: true,
    code: 1118,
    message: "이미지를 업로드하였습니다",
  },
  DELETE_SUCCESS: {
    isSuccess: true,
    code: 1119,
    message: "이미지를 삭제하였습니다.",
  },
  REFRESH_SUCCESS: {
    isSuccess: true,
    code: 1120,
    message: "토큰을 재발급했습니다.",
  },
  POST_SURVEY: {
    isSuccess: true,
    code: 1121,
    message: "설문을 저장했습니다.",
  },
  MENTO_AUTH_SUCCESS: {
    isSuccess: true,
    code: 1122,
    message: "멘토 권한을 부여했습니다.",
  },
  PATCH_PROFILE_SUCCESS: {
    isSuccess: true,
    code: 1123,
    message: "프로필을 변경하였습니다.",
  },
  PATCH_PASSWORD_SUCCESS: {
    isSuccess: true,
    code: 1124,
    message: "비밀번호를 변경하였습니다.",
  },
  PATCH_NICKNAME_SUCCESS: {
    isSuccess: true,
    code: 1125,
    message: "닉네임을 변경하였습니다.",
  },
  //FAIL
  DUP_EMAIL: {
    isSuccess: false,
    code: 2001,
    message: "이미 가입된 이메일입니다.",
  },
  DUP_NICKNAME: {
    isSuccess: false,
    code: 2002,
    message: "이미 가입된 닉네임입니다.",
  },
  DUP_PHONE: {
    isSuccess: false,
    code: 2037,
    message: "이미 가입된 번호입니다.",
  },
  EMPTY_EMAIL: {
    isSuccess: false,
    code: 2003,
    message: "이메일이 누락되었습니다.",
  },
  EMAIL_LENGTH_ERROR: {
    isSuccess: false,
    code: 2004,
    message: "이메일 길이 초과",
  },
  EMAIL_FORM: {
    isSuccess: false,
    code: 2005,
    message: "이메일 형식이 아닙니다.",
  },
  EMPTY_PASSWORD: {
    isSuccess: false,
    code: 2006,
    message: "비밀번호가 누락되었습니다.",
  },
  PASSWORD_LENGTH_ERROR: {
    isSuccess: false,
    code: 2007,
    message: "비밀번호 길이가 너무 짧습니다.",
  },
  PASSWORD_FORM: {
    isSuccess: false,
    code: 2008,
    message: "비밀번호 형식이 잘못 되었습니다.",
  },
  EMPTY_PHONE: {
    isSuccess: false,
    code: 2009,
    message: "핸드폰 번호가 누락되었습니다.",
  },
  PHONE_FORM: {
    isSuccess: false,
    code: 2010,
    message: "핸드폰 번호 형식이 아닙니다.",
  },
  EMPTY_NICKNAME: {
    isSUccess: false,
    code: 2011,
    message: "닉네임이 누락되었습니다.",
  },
  NICKNAME_LENGTH_ERROR: {
    isSuccess: false,
    code: 2012,
    message: "닉네임을 길이에 맞게 설정해주세요.",
  },
  NICKNAME_FORM: {
    isSUccess: false,
    code: 2013,
    message: "닉네임 형식이 아닙니다.",
  },
  NOT_EXIST_EMAIL: {
    isSuccess: false,
    code: 2014,
    message: "존재하지 않는 이메일입니다.",
  },
  PASSWORD_MISMATCH: {
    isSuccess: false,
    code: 2015,
    message: "비밀번호가 일치하지 않습니다.",
  },
  NONE_TOKEN: {
    isSuccess: false,
    code: 2016,
    message: "인증번호를 재발송해주세요.",
  },
  INCORRECT_TOKEN: {
    isSuccess: false,
    code: 2017,
    message: "인증번호가 일치하지 않습니다.",
  },
  NOT_LOGGEDIN: {
    isSuccess: false,
    code: 2018,
    message: "로그인 되어있지 않습니다. 다시 로그인 해주세요.",
  },
  EMPTY_LANGUAGE: {
    isSuccess: false,
    code: 2019,
    message: "언어가 누락되었습니다.",
  },
  EMPTY_TITLE: {
    isSuccess: false,
    code: 2020,
    message: "제목이 누락되었습니다",
  },
  EMPTY_CONTENT: {
    isSuccess: false,
    code: 2021,
    message: "내용이 누락되었습니다",
  },
  EMPTY_TOKEN: {
    isSuccess: false,
    code: 2022,
    message: "토큰이 누락되었습니다.",
  },
  TOKEN_VERFICATION_FAIL: {
    isSuccess: false,
    code: 2023,
    message: "토큰 검증 실패",
  },
  NONE_QUESTION: {
    isSuccess: false,
    code: 2024,
    message: "게시한 질문이 없습니다.",
  },
  EXIST_QUESTION: {
    isSuccess: false,
    code: 2025,
    message: "이미 게시한 질문입니다.",
  },
  NO_MODIFY: {
    isSuccess: false,
    code: 2026,
    message:
      "질문을 변경할 수 없습니다. 질문 요소 중 누락된 요소가 존재합니다.",
  },
  CUREENT_MENTORINGMODE: {
    isSuccess: false,
    code: 2027,
    message: "이미 멘토리중이므로 질문을 변경할 수 없습니다.",
  },
  EMPTY_QUESTIONID: {
    isSuccess: false,
    code: 2028,
    message: "질문 번호가 누락되었습니다",
  },
  NO_ROUTER: {
    isSuccess: false,
    code: 2029,
    message: "요청하신 라우터는 존재하지 않습니다.",
  },
  NONE_ROOM: {
    isSuccess: false,
    code: 2030,
    message: "해당 유저가 참여하고 있는 채팅은 존재하지 않습니다.",
  },
  EMPTY_MENTORINGID: {
    isSuccess: false,
    code: 2031,
    message: "멘토링번호가 누락되었습니다.",
  },
  NONE_MENTORING: {
    isSuccess: false,
    code: 2031,
    message: "해당 멘토링 데이터는 존재하지 않습니다.",
  },
  NOT_MENTO: { isSuccess: false, code: 2032, message: "멘토 권한이 없습니다." },
  NO_QUESTION: {
    isSuccess: false,
    code: 2033,
    message: "질문을 찾을 수 없습니다.",
  },
  ALREADY_MENTROING_QUESTION: {
    isSuccess: false,
    code: 2034,
    message: "이미 체결된 멘토링입니다.",
  },
  EMPTY_MESSAGE: {
    isSuccess: false,
    code: 2035,
    message: "메세지가 누락되었습니다.",
  },
  EMPTY_ROOM: {
    isSuccess: false,
    code: 2036,
    message: "존재하지 않는 채팅방이에요",
  },
  FILE_FORM: {
    isSuccess: false,
    code: 2039,
    message: "이미지 파일만 올려주세요.",
  },
  UPLOAD_FAIL: {
    isSuccess: false,
    code: 2040,
    message: "업로드를 실패하였습니다.",
  },
  NOT_EXIST_QUESTION: {
    isSuccess: false,
    code: 2041,
    message: "존재하지 않는 질문입니다",
  },
  UPLOADFILE_EMPTY: {
    isSuccess: false,
    code: 2042,
    message: "파일이 비었습니다.",
  },
  TOKEN_EXPIRED: {
    isSuccess: false,
    code: 2043,
    message: "토큰이 만료되었습니다.",
  },
  EMPTY_ANSWER: {
    isSuccess: false,
    code: 2044,
    message: "평가를 작성해주세요.",
  },
  ALREADY_SURVEY: {
    isSuccess: false,
    code: 2045,
    message: "이미 설문을 저장했습니다.",
  },
  EMPTY_CHECKING: {
    isSuccess: false,
    code: 2046,
    message: "모든 문항에 체크해주세요.",
  },
  ALREADY_MENTO: {
    isSuccess: false,
    code: 2047,
    message: "이미 멘토 권한을 갖고 있습니다.",
  },
  BAD_STATUS_URI: {
    isSuccess: false,
    code: 2048,
    message: "올바른 url을 입력해주세요.",
  },
  TOKEN_NOT_MATCH: {
    isSuccess: false,
    code: 2049,
    message: "토큰이 일치하지 않아요.",
  },
  NOT_MATCH_NICKNAME: {
    isSuccess: false,
    code: 2050,
    message: "닉네임이 일치하지 않습니다.",
  },
  NOT_MATCH_PASSWORD: {
    isSuccess: false,
    code: 2051,
    message: "기존 비밀번호를 잘못 입력하였습니다.",
  },
  EMPTY_PROFILE: {
    isSuccess: false,
    code: 2052,
    message: "변경하고자하는 이미지가 누락되었습니다.",
  },
  NOT_BEFORE_STATUS: {
    isSuccess: false,
    code: 2053,
    message: "이미 진행중이거나 완료된 질문입니다.",
  },
  NOT_MENTEE: {
    isSuccess: false,
    code: 2054,
    message: "멘티가 아닙니다.",
  },
  CONTENT_LENGTH_OVER: {
    isSuccess: false,
    code: 2055,
    message: "글 내용이 너무 길어요. 조금만 더 줄여주세요 :)",
  },
  USER_NOT_EXIST_INROOM: {
    isSuccess: false,
    code: 2056,
    message: "해당 유저는 채팅방 권한이 없어요.",
  },
  EMPTY_IMAGE: {
    isSuccess: false,
    code: 2057,
    message: "채팅으로 보낸 이미지가 비었어요.",
  },
  QUESTION_TYPE_ERROR: {
    isSuccess: false,
    code: 2058,
    message: "체결전, 진행중, 완료된 질문 중 선택해주세요.",
  },
  EMPTY_PARAM: {
    isSuccess: false,
    code: 2060,
    message: "쿼리 파라미터가 누락되었습니다.",
  },
  UNABLE_ENTER_ROOM: {
    isSuccess:false,
    code:2061,
    message:"멘토링 체결전이므로 채팅방에 입장할 수 없습니다."
  },
  NO_PARTNER: {
    isSuccess:false,
    code:2062,
    message:"멘토링 파트너가 없습니다"
  },

  //데이터베이스오류
  DB_ERROR: { isSuccess: false, code: 5050, message: "데이터베이스 에러" },
};
