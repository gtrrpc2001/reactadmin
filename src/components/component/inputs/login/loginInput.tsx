type Props = {
  id: string;
  className: string;
  inputClassName: string;
  placeholder: string;
  onClick: () => void;
  type: string;
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  onKeypress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onHandler: (e: any) => void;
};

export const LoginInput = ({
  id,
  className,
  inputClassName,
  placeholder,
  onClick,
  type,
  inputRef,
  value,
  onKeypress,
  onHandler,
}: Props) => {
  return (
    <div className={className} onClick={onClick}>
      <input
        id={id}
        className={inputClassName}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onKeyPress={(e) => onKeypress(e)}
        onChange={onHandler}
        autoComplete={type == "password" ? "current-password" : "username"}
      />
    </div>
  );
};
