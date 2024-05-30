type Props = {
  logo: string;
  logoClick: () => void;
};

export const LoginLogo = ({ logo, logoClick }: Props) => {
  return (
    <div className="titleWrap">
      <img className="logo" src={logo} onClick={logoClick} typeof="button" />
    </div>
  );
};
