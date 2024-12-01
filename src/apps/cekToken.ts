import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";

export const cekToken = () => {
    const token = Cookies.get('token'); // Atau dari penyimpanan yang Anda gunakan
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token);
        if (exp && Date.now() >= exp * 1000) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}
