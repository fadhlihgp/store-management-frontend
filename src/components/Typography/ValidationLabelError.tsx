interface ValidationLabelErrorProps {
    message: string
}

export const ValidationLabelError = ({message}: ValidationLabelErrorProps) => {
    return(
        <span className="text-red-500 text-sm mt-1">{message}</span>
    )
}