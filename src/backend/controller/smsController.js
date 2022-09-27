const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');
const CODE = require('../modules/statusCode');

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
        const cellphone = req.body.userPhoneNum;
      
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
          res.json({ statusCode: CODE.SUCCESS, msg: "send message" });
        })
        .catch((err) => {
          if(err.res == undefined){
            res.json({ statusCode: CODE.SUCCESS, msg: "send message" });
          }
          else res.json({ statusCode: CODE.FAIL, msg: "fail sending message" });
        });
    },
    verify : async (req, res) => {
      const phoneNumber = req.body.userPhoneNum;
      const verifyCode = req.body.verifyCode;

      const CacheData = Cache.get(phoneNumber);

      if (!CacheData) {
        return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect phonenum" , result : 0});
      } else if (CacheData !== verifyCode) {
        return res.json({ statusCode: CODE.INVALID_VALUE, msg: "incorrect token" ,result:0} );
      } else {
        Cache.del(phoneNumber);
        return res.json({ statusCode: CODE.SUCCESS, msg: "correct token" ,result: 1}); 
      }
    }

};

module.exports = sms;