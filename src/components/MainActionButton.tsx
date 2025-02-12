
export enum ButtonType {
  Success = 'btn-success',
  Primary = 'btn-primary',
}

type StartNowButtonProps = {
  onClick: () => void;
  title: string
  buttonType?: ButtonType;
};

export default function MainActionButton(props: StartNowButtonProps) {
  const { onClick, title, buttonType = ButtonType.Success } = props;
  return <button type="button" className={`btn ${buttonType} btn-lg m-5`} onClick={onClick}>{title}</button>;
}
