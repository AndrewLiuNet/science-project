import request from '@/utils/request';
const requst = {
    // 登录
    Login(params) {
        return request({
            url: `/api/yb_userinfo/GetToken`,
            data:params,
            method: 'post',
        })
    },
}
export default requst