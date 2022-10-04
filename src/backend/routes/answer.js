const express = require("express");
const router = express.Router();
const url = require("url");
const qs = require("querystring");
const { Mentoring, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../modules/token");
const { useRecoilSnapshot } = require("recoil");

router.get("/", async (req, res, next) => {
  try {
    const qry = url.parse(req.url, true).query;
    console.log(qry);
    const lang = qry.lang ? qry.lang : 0;
    const cond = lang <= 0 ? {} : { language: lang };
    const postCount = await Mentoring.count({ where: cond });
    const postList = await Mentoring.findAll({
      where: cond,
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
      order: [["mentoringId", "DESC"]],
      attributes: ["mentoringId", "User.nickname", "title", "date", "language"],
      raw: true,
    });
    let article;
    if (qry.id !== undefined) {
      article = await Mentoring.findOne({
        where: { mentoringId: qry.id },
        include: [
          {
            model: User,
            attributes: [],
          },
        ],
        order: [["mentoringId", "DESC"]],
        attributes: [
          "User.nickname",
          "title",
          "date",
          "language",
          "content",
          "content_image",
        ],
        raw: true,
      });
      article.content_image = article.content_image.split(":");
    } else {
      article = {
        nickname: "",
        title: "",
        date: "",
        language: "",
        content: "",
        content_image: "",
      };
    }
    console.log("cnt=" + postCount);
    console.log(postList);
    console.log(article);

    res.render("answer.ejs", {
      lang: lang,
      postCount: postCount,
      postList: postList,
      article: article,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
/*
router.get("/", function (req, res) {
  var qry = url.parse(req.url, true).query;
  var sqlConn = mysql.createConnection(conf.development); // DB 커넥션 생성
  sqlConn.connect();
  console.log(qry);
  var lang = qry.lang ? qry.lang : "";
  var cond = lang <= 0 ? "" : " WHERE language=" + lang;
  var sql =
    "SELECT COUNT(*) AS cnt FROM mentoring" +
    cond +
    "; SELECT mentoringId,nickname,title,date,language FROM mentoring inner join users on menteeId = userId" +
    cond +
    " ORDER BY mentoringId DESC;";
  console.log(sql);

  if (qry.id !== undefined) {
    sql +=
      "SELECT nickname,title,date,language,content,content_image FROM mentoring inner join users on menteeId = userId WHERE mentoringId=" +
      qry.id;
  }

  sqlConn.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    var article;
    if (qry.id !== undefined) {
      article = results[2][0];
    } else {
      article = {
        nickname: "",
        title: "",
        date: "",
        language: "",
        content: "",
        content_image: "",
      };
    }
    console.log(results);
    res.render("answer.ejs", {
      lang: lang,
      postCount: results[0][0].cnt,
      postList: results[1],
      article: article,
    });
  });

  sqlConn.end();
});
*/

module.exports = router;
