module.exports = {
    //SUCCESS
    SIGNUP_SUCCESS : {isSuccess: true, code:1100, message: "회원가입에 성공하였습니다."},
    SIGNIN_SUCCESS : {isSuccess: true, code:1101, message: "로그인에 성공하였습니다"},
    UPDATE_PASSWORD : {isSuccess: true, code:1102, message: "비밀번호를 변경하였습니다."},
    AVAILABLE_EMAIL : {isSuccess: true, code: 1103, message: "사용가능한 이메일입니다."},
    AVAILABLE_PHONE : {isSuccess: true, code: 1104, message: "사용가능한 번호입니다."},
    AVAILABLE_NICKNAME : {isSuccess: true, code: 1105, message: "사용가능한 닉네임입니다."},
    SEND_EMAIL : {isSuccess: true, code: 1106, message: "이메일로 인증번호를 전송하였습니다." },
    POST_QUESTION: {isSuccess: true, code: 1107, message: "질문을 게시하였습니다."},
    GET_QUESTION: {isSuccess: true, code: 1108, message: "사용자가 게시한 질문입니다."},
    MODIFY_SUCCESS: {isSuccess: true, code: 1109, message: "질문을 수정하였습니다"},
    //FAIL
    DUP_EMAIL : {isSuccess: false, code: 2001, message: "이미 가입된 이메일입니다."},
    DUP_NICKNAME: {isSuccess: false, code: 2002, message: "이미 가입된 닉네임입니다."},
    DUP_PHONE: {isSuccess: false, code: 2018, message: "이미 가입된 번호입니다."},
    EMPTY_EMAIL : {isSuccess: false, code: 2003, message: "이메일이 누락되었습니다."},
    EMAIL_LENGTH_ERROR : {isSuccess: false, code: 2004, message: "이메일 길이 초과"},
    EMAIL_FORM : {isSuccess: false, code: 2005, message: "이메일 형식이 아닙니다."},
    EMPTY_PASSWORD: {isSuccess: false, code: 2006, message: "비밀번호가 누락되었습니다."},
    PASSWORD_LENGTH_ERROR : {isSuccess: false, code:2007, message: "비밀번호 길이가 너무 짧습니다."},
    PASSWORD_FORM : {isSuccess: false, code: 2008, message: "비밀번호 형식이 잘못 되었습니다."},
    EMPTY_PHONE : {isSuccess: false, code: 2009, message:"핸드폰 번호가 누락되었습니다."},
    PHONE_FORM : {isSuccess: false, code: 2010, message: "핸드폰 번호 형식이 아닙니다."},
    EMPTY_NICKNAME : {isSUccess: false, code: 2011, message: "닉네임이 누락되었습니다."},
    NICKNAME_LENGTH_ERROR : {isSuccess: false, code: 2012, message:"닉네임을 길이에 맞게 설정해주세요."},
    NICKNAME_FORM : {isSUccess:false, code:2013, message:"닉네임 형식이 아닙니다."},
    NOT_EXIST_EMAIL : {isSuccess: false, code:2014, message: "존재하지 않는 이메일입니다."},
    PASSWORD_MISMATCH : {isSuccess: false, code:2015, message: "비밀번호가 일치하지 않습니다."},
    NONE_TOKEN : {isSuccess: false, code: 2016, message:"인증번호를 재발송해주세요."},
    INCORRECT_TOKEN : {isSuccess: false, code: 2017, message: "인증번호가 일치하지 않습니다."},
    NOT_LOGGEDIN : {isSuccess:false, code:2018, message: "로그인 되어있지 않습니다. 다시 로그인 해주세요."},
    EMPTY_LANGUAGE: {isSuccess:false, code:2019, message: "언어가 누락되었습니다."},
    EMPTY_TITLE: {isSuccess:false, code:2020, message: "제목이 누락되었습니다"},
    EMPTY_CONTENT: {isSuccess:false, code:2021, message: "내용이 누락되었습니다"},
    EMPTY_TOKEN: {isSuccess:false, code:2022, message: "토큰이 누락되었습니다."},
    TOKEN_VERFICATION_FAIL: {isSuccess:false, code:2023, message:"토큰 검증 실패"},
    NONE_QUESTION : {isSuccess:false, code:2024, message:"게시한 질문이 없습니다."},
    EXIST_QUESTION: {isSuccess:false, code:2025, message:"이미 게시한 질문입니다."},
    NO_MODIFY: {isSuccess:false, code:2026, message:"질문을 변경할 수 없습니다. 질문 요소 중 누락된 요소가 존재합니다."},
    CUREENT_MENTORINGMODE: {isSuccess:false, code:2027, message:"이미 멘토리중이므로 질문을 변경할 수 없습니다."},
    //데이터베이스오류
    DB_ERROR : {isSuccess: false, code: 5050, message: "데이터베이스 에러"}

}