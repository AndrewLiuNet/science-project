import request from '@/utils/request';
const requst = {
    // 获取年份
    getYearListData(data) {
        return request({
            url: `/api/common/GetYears`,
            method: 'post',
            data
        })
    },
    // 基于年份Id获取科研项目立项数据 如果年份id 为空则返回所有年份数据
    getResearList(params) {
        return request({
            url: `/api/common/GetResearList`,
            data: params,
            method: 'post',
        })
    },
    // 项目结项
    getFinishResearList(params) {
        return request({
            url: `/api/common/GetFinishResearList`,
            data: params,
            method: 'post',
        })
    },
    // 论文发表
    getPaperlist(params) {
        return request({
            url: `/api/common/GetPaperlist`,
            data: params,
            method: 'post',
        })
    },
    // 出版著作
    getPublishedList(params) {
        return request({
            url: `/api/common/GetPublishedList`,
            data: params,
            method: 'post',
        })
    },
    // 专利授权
    getLicensList(params) {
        return request({
            url: `/api/common/GetLicensList`,
            data: params,
            method: 'post',
        })
    },
    // 软件著作
    getRegList(params) {
        return request({
            url: `/api/common/GetRegList`,
            data: params,
            method: 'post',
        })
    },
    // 咨询报告
    getReportList(params) {
        return request({
            url: `/api/common/GetReportList`,
            data: params,
            method: 'post',
        })
    },
    // 科技奖励
    getTecAwardslist(params) {
        return request({
            url: `/api/common/GetTecAwardslist`,
            data: params,
            method: 'post',
        })
    },
    // 举办学术活动汇总
    getAcaSems(params) {
        return request({
            url: `/api/common/GetAcaSems`,
            data: params,
            method: 'post',
        })
    },
    // 参加学术活动汇总
    getAttAcaList(params) {
        return request({
            url: `/api/common/GetAttAcaList`,
            data: params,
            method: 'post',
        })
    },
    // 大事记
    getMems(params) {
        return request({
            url: `/api/common/GetMems`,
            data: params,
            method: 'post',
        })
    },
    // 大事记详情
    getMemDetails(params) {
        return request({
            url: `/api/common/GetMemDetails`,
            data: params,
            method: 'post',
        })
    },
    //科研报告
    getResearchProject(params){
        return request({
            url:`/api/yb1_research_project/GetList`,
            data:params,
            method:'post',
        })
    }

}
export default requst