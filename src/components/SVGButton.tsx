import Image from 'next/image';
import styles from './SVGButton.module.css';

type SVGButtonProps = {
  onClick: () => void
  svg: { src: string }
};

export default function SVGButton(props: SVGButtonProps) {
  const { onClick, svg } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
    >
      <Image src={svg.src} alt="image button" width={30} height={30} />
    </button>
  );
}
