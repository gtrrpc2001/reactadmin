
type Props = {
    pw:string
    pwError:string
}

export const LoginPwdError = ({pw,pwError}:Props) => {
    return (
        <div className="errorMessageWrap">
            {pw.length < 8 && pw.length != 0 && (
                <div> {pwError} </div>
            )}
        </div>
    );
}