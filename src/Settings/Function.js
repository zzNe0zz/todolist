import instance from "./SettingApi"

function ssDate(dateTask){
    let date = new Date()
    let kq1=date.getTime()
    let date2 = new Date(dateTask).getTime()
   
     if(date2 < kq1){
       return true
     }
     else  return false
  }
  function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  function checkCookie(name) {
    let username = getCookie(`${name}`);
    if (username !== "") {
     alert("Welcome again " + username);
    } else {
      username = prompt("Please enter your name:", "");
      if (username !== "" && username !== null) {
        setCookie("username", username, 365);
      }
    }
  }
  async function fixData (value,id,token){

    try {
        await instance.put(`/tasks/${id}`,{
          data : value
        },{
         headers: {
           'Authorization': `Bearer ${token}`,
         }
        })
    } catch (error) {
      
    }
  }
  async function deleData (id,token){
    try {
      await instance.delete(`/tasks/${id}`,{
         headers: {
           'Authorization': `Bearer ${token}`,
         }
        })
       } catch (error) {
         
       }
  }
  export  {ssDate,setCookie,checkCookie,getCookie,fixData,deleData}