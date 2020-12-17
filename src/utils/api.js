const baseUrl = 'http://hbqc.ccpmc.org/';

const getCoreDetail = baseUrl + 'QualityControlIndex/getCoreDetail';  // 质控指标获取区域指标详情
const getHospitalJoinedListByCore = baseUrl + 'QualityControlIndex/getHospitalJoinedListByCore';  // 质控指标获取某指标下的医联体
const getHospitalJoinedList = baseUrl + 'Hospital/getHospitalJoinedList';  // 质控指标搜索医联体
const getHospitalList = baseUrl + 'Hospital/getHospitalList'; // 质控指标 获取医院列表
const getScoreInfo = baseUrl + 'QualityControlScore/getScoreInfo';   // 质控指标 获取吗某区域的质控分数\
const getScoreListForHospital = baseUrl + 'QualityControlScore/getScoreListForHospital'; // 质控指标 某区域的质控分数
const getCoreRank = baseUrl + '/QualityControlIndex/getCoreRank'; // 获取对比排名信息

const getTimeInfoByHospital = 'https://www.chinahc.org.cn/apidata/getTimeInfoByHospital'; // 质控指标 获取医院，医联体注册时间
// const getTimeInfoByHospital = 'http://highblood.chinacpc.mobi/apidata/getTimeInfoByHospital'; // 质控指标 获取医院，医联体注册时间
const get6Month = 'http://newhyper.chinahc.org.cn/api/v1/qc/month'; // 质控指标 近六月填报趋势
// const get6Month = 'http://newhyper.chinacpc.mobi/api/v1/qc/month'; // 质控指标 近六月填报趋势


export {
  getCoreDetail,
  getHospitalJoinedListByCore,
  getHospitalJoinedList,
  getHospitalList,
  getScoreInfo,
  getScoreListForHospital,
  getCoreRank,
  getTimeInfoByHospital,
  get6Month
}