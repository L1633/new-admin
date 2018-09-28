import ajax from './ajax'

//登录
export const Reqlogin = (data) => ajax("/api/login", data , "POST");
// 获取机构信息
export const getAgentInfo = (data) => ajax("/api/getAgentInfo", data , "POST");
// 获取课程日历
export const getAgentCourseTimeDayList = (data) => ajax("/api/getAgentCourseTimeDayList", data, "POST");
// 获取我的课程
export const getAgentCourseList = (data) => ajax("/api/getAgentCourseList", data, "POST");
//获取班级同学列表
export const getBabyCourseUsers = (data) => ajax("/api/getBabyCourseUsers", data, "POST");
