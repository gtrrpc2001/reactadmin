type Props = {
  backgroundImage: string;
  className: string;
};

export const LoginImg = ({ className, backgroundImage }: Props) => {
  return (
    <div>
      <img className={className} src={backgroundImage} />
    </div>
  );
};
