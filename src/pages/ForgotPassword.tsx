import ForgotPasswordContainer from "../features/User/ForgotPasswordContainer.js";
import {Helmet} from "react-helmet";

function ExternalPage(){


    return(
        <div>
            <Helmet>
                <meta title="Lupa Password - KelolaWarung" />
                <meta name="description" content="Lupa password KelolaWarung" />
                <title>Lupa Password - KelolaWarung</title>
            </Helmet>
            <ForgotPasswordContainer />
        </div>
    )
}

export default ExternalPage
