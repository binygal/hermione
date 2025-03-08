import Image from "next/image";

type SVGButtonProps = {
  onClick: () => void;
  svg: { src: string };
} & Omit<React.HTMLProps<HTMLButtonElement>, "type">;

export default function SVGButton(props: SVGButtonProps) {
  const { onClick, svg, className, ...rest } = props;
  return (
    <button type="button" onClick={onClick} className={`btn btn-circle btn-ghost ${className ?? ""}`} {...rest}>
      <Image src={svg.src} alt="image button" width={30} height={30} />
    </button>
  );
}
