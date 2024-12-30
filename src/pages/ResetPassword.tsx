import { ResetPasswordContainer } from "../features/User/ResetPasswordContainer"
import {Helmet} from "react-helmet";

export const ResetPassword = () => {
    return (
        <div>
            <Helmet>
                <meta title="Reset Password - KelolaWarung" />
                <meta name="description" content="Reset password KelolaWarung" />
                <title>Lupa Password - KelolaWarung</title>
            </Helmet>
            <ResetPasswordContainer />
        </div>
    )
}
