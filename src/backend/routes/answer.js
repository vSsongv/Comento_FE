const express = require("express");
const router = express.Router();
const url = require("url");
const qs = require("querystring");
const { Mentoring, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
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

module.exports = router;
