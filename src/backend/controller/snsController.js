const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');

const date = Date.now().toString();
const uri = process.env.SMS_ID;
const secretKey = process.env.SMS_SECRETKEY;
const accessKey = process.env.SMS_ACCESSKEY;
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

const sms = {
    send : async (req, res) => {
        const cellphone = req.body.cellphone;
      
        Cache.del(cellphone);
      
        //인증번호 생성
        const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      
        Cache.put(cellphone, verifyCode.toString());
      
        axios({
          method: method,
          json: true,
          url: url,
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-v2': signature,
          },
          data: {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: '01055427885',
            content: `[Comento] 인증번호 [${verifyCode}]를 입력해주세요.`,
            messages: [
              {
                to: `${cellphone}`,
              },
            ],
          }, 
          })
        .then(function (res) {
          res.send({status: 200, msg: "메세지를 발송했습니다."});
        })
        .catch((err) => {
          if(err.res == undefined){
            res.send({status: 200, msg: "메세지를 발송했습니다."});
          }
          else res.send({status:400, msg: "메세지 발송 오류"});
        });
    },
    verify : async (req, res) => {
      const phoneNumber = req.body.cellphone;
      const verifyCode = req.body.verifyCode;

      const CacheData = Cache.get(phoneNumber);

      if (!CacheData) {
        return res.send({msg: "폰넘버이상"});
      } else if (CacheData !== verifyCode) {
          return res.send({msg: "인증번호불일치"});
      } else {
        Cache.del(phoneNumber);
        return res.send({msg: "일치"});     
      }
    }

};

module.exports = sms;