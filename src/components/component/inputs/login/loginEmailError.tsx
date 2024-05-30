type Props = {
  emailValid: boolean;
  email: string;
  emailError: string;
};

export const LoginEmailError = ({ emailValid, email, emailError }: Props) => {
  return (
    <div className="errorMessageWrap">
      {emailValid == false && email.length > 0 && <div> {emailError} </div>}
    </div>
  );
};
