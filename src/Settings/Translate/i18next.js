import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
    en: {
      task: {
        "task": "Task",
        "creat": "Creat new task"
      },
     info:{
        "total" : "Total",
        "complete" : "Complete",
        "pending": "Pending",
        "fail":"Fail"
     },
     card:{
      "date":"Date",
      "time" :"Time",
      "delete":"Delete",
      "complete":"Complete"
     }
    },
    vn: {
      task: {
        "task": "Công việc cần làm",
        "creat": "Thêm công việc"
      },
      info:{
        "total" : "Tổng",
        "complete" : "Hoàn thành",
        "pending": "Đang chờ",
        "fail":"Thất bại"
     }, 
     card:{
      "date":"Ngày",
      "time" :"Giờ",
      "delete":"Xóa",
      "complete":"Hoàn Thành"
     }

    }
  };

  i18n.use(initReactI18next).init({
    resources,
    lng: "vn", 
    ns :["task","info","card"],
    default:"vn",
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;