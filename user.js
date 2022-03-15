export function userHandler() {
    if ( navigator.cookieEnabled ) {
        if ( getCookie ( "visited" ) ) {
            return false;
        }
        else {
            setCookie ( "visited", true, 365 )
            return true;
        }
    } else {
        return false;
    }
}

function setCookie ( cname, cvalue, expdays ) {
    const d = new Date();
    d.setTime ( d.getTime() + ( expdays * 86400000 ) );
    let expire = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expire + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }