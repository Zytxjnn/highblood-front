const baseUrl = 'http://gxyzkend.ccpmc.org/';

const getCoreDetail = baseUrl + 'QualityControlIndex/getCoreDetail';  // 质控指标获取区域指标详情
const getHospitalJoinedListByCore = baseUrl + 'QualityControlIndex/getHospitalJoinedListByCore';  // 质控指标获取某指标下的医联体
const getHospitalJoinedList = baseUrl + 'Hospital/getHospitalJoinedList';  // 质控指标搜索医联体
const getHospitalList = baseUrl + '/Hospital/getHospitalList'; // 质控指标 获取医院列表
const getScoreInfo = baseUrl + '/QualityControlScore/getScoreInfo';   // 质控指标 获取吗某区域的质控分数\
const getScoreListForHospital = baseUrl + '/QualityControlScore/getScoreListForHospital'; // 质控指标 某区域的质控分数

export {
  getCoreDetail,
  getHospitalJoinedListByCore,
  getHospitalJoinedList,
  getHospitalList,
  getScoreInfo,
  getScoreListForHospital
}