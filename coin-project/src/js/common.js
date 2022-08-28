const setCookie = function(name, value, exp) {      
    let date = new Date();      
    date.setTime(date.getTime() + exp*24*60*60*1000);      
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';  
}

const getCookie = function(name) {      
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');      
    return value? value[2] : null;  
}

const deleteCookie = function(name) {      
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';  
}

const common = {
    setCookie,
    getCookie,
    deleteCookie
}

export default common