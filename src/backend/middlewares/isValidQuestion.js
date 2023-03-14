const errorResponse = require("../config/errorResponse");
const { basicResponse } = require("../config/response");
const detailResponse = require("../config/responseDetail");
const menteeService = require("../Mentee/menteeService");
const isValidQuestion = async function (req, next) {
  const mentoringid = req.query.mentoringid;
  if (!mentoringid)
    return next(errorResponse(basicResponse(detailResponse.EMPTY_MENTORINGID)));
  const mentoringStatus = await menteeService.checkMentoringStatus(mentoringid);
  if (!mentoringStatus)
    return next(
      errorResponse(basicResponse(detailResponse.NOT_EXIST_QUESTION))
    );
  if (mentoringStatus !== "N")
    return next(errorResponse(basicResponse(detailResponse.NOT_BEFORE_STATUS)));
  next();
};

module.exports = isValidQuestion;
