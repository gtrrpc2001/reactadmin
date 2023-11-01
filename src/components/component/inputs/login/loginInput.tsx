

type Props = {
    className:string
    inputClassName:string
    placeholder:string
    onClick:() => void
    type:string
    ref:React.RefObject<HTMLInputElement>
    value:string
    onKeypress:(e: any) => void
    onHandler:(e: any) => void
}

export const LoginInput = ({className,inputClassName,placeholder,onClick,type,ref,value,onKeypress,onHandler}:Props) => {
    return (
        <div className={className} onClick={onClick}>
            <input 
                className={inputClassName}
                type={type}
                ref={ref}
                placeholder={placeholder}
                value={value}                            
                onKeyPress={(e) =>onKeypress(e)}
                onChange={onHandler}
            />                            
        </div>
    )
}