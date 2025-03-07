import { PropsWithClassName } from "../common/components/components.type";

export enum ButtonType {
  Success = "btn-success",
  Primary = "btn-primary",
}

type StartNowButtonProps = {
  onClick: () => void;
  title: string;
  buttonType?: ButtonType;
};

export default function MainActionButton(props: PropsWithClassName<StartNowButtonProps>) {
  const { onClick, title, buttonType = ButtonType.Success, className = "" } = props;
  return (
    <button type="button" className={`btn ${buttonType} btn-lg m-1 ${className}`} onClick={onClick}>
      {title}
    </button>
  );
}
