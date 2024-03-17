import Cookies from "js-cookie";


export const cekToken = () => {
    return Cookies.get('token');
}
