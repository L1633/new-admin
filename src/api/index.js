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

//关注列表 没有cid
export const getFollowList = (data) => ajax("/api/getFollowList", data, "POST");
 
///api/follow_info 关注/取消  没有cid
export const follow_info = (data) => ajax("/api/follow_info", data, "POST");

///api/getTopicList  没有cid  话题列表
export const getTopicList = (data) => ajax("/api/getTopicList", data, "POST");

///api/release_topic 发布编辑话题
export const release_topic = (data) => ajax("/api/release_topic", data, "POST");

//deleteTopic 删除话题
export const deleteTopic = (data) => ajax("/api/deleteTopic", data, "POST");
 
///api/getTopic 没有cid 查看话题
export const getTopic = (data) => ajax("/api/getTopic", data, "POST");

///api/getOrderList 没有cid
export const getOrderList = (data) => ajax("/api/getOrderList", data, "POST");

///api/getBranchAgentList 机构列表
export const getBranchAgentList = (data) => ajax("/api/getBranchAgentList", data, "POST");

//getAgentCourse
export const getAgentCourse = (data) => ajax("/api/getAgentCourse", data, "POST");

//api/getTeacherList
export const getTeacherList = (data) => ajax("/api/getTeacherList", data, "POST");

//api/contractTeacher  没有cid 解约老师
export const contractTeacher = (data) => ajax("/api/contractTeacher", data, "POST");

//api/getAgentStudents 机构学员
export const getAgentStudents = (data) => ajax("/api/getAgentStudents", data, "POST");

//api/getUserNotification  获取用户通知
export const getWebUserNotification = (data) => ajax("/api/getWebUserNotification", data, "POST");

//api/releaseCourse 发布编辑课程信息
export const releaseCourse = (data) => ajax("/api/releaseCourse", data, "POST");

///api/getCourseSortList 获取课程分类
export const getCourseSortList = (data) => ajax("/api/getCourseSortList", data, "POST");

///api/getAgentCourseTimeList 没有cid
export const getAgentCourseTimeList = (data) => ajax("/api/getAgentCourseTimeList", data, "POST");

///api/releaseCourseTask
export const releaseCourseTask = (data) => ajax("/api/releaseCourseTask", data, "POST");

