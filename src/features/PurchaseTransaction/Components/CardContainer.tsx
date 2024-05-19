import {Card1} from "./Card1";

export const CardContainer = () => {
    return(
        <div className={'flex gap-2 flex-col md:flex-row space-y-4 md:space-x-4'}>
            <Card1 />
            <Card1 />
            <Card1 />
        </div>
    )
}
