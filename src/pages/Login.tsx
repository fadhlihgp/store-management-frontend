import LoginContainer from "../features/User/LoginContainer";
import {Helmet} from "react-helmet";

export const Login = () => {
    return(
        <div>
            <Helmet>
                <meta title="Login -KelolaWarung" />
                <meta name="description" content="Login KelolaWarung" />
                <title>Login - KelolaWarung</title>
            </Helmet>
            <LoginContainer />
        </div>
    )
}
