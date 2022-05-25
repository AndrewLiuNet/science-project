// import axios from "axios";
// import {
//     getToken
// } from "@/utils/auth";

// let token = '';

// // create an axios instance
// const service = axios.create({
//     baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//     timeout: 5000, // request timeout
//     withCredentials: false

// })

// service.defaults.headers.common['token'] = token;
// service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

// // request interceptor
// service.interceptors.request.use(
//     config => {
//         const token = getToken();
//         if (token) {
//             config.headers["Authorization"] = 'Bearer' + ' ' + token;
//         } else {
//             // throw new Error("token 失效")
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// // response interceptor
// service.interceptors.response.use(
//     response => {
//         // console.log(response.data);
//         const res = response.data
//         // 如果自定义代码不是200，则判断为错误.
//         switch (res.code) {
//             case 200:
//                 return res;
//             case 201:
//                 return res;
//             default:
//                 return Promise.reject(new Error(res.message || "Error"))
//         }
//     },
//     error => {
//         return Promise.reject(error)
//     },

// )
// export default service