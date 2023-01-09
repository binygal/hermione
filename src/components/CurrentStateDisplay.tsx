import Image from 'next/image';
import workingLogo from './resources/working.svg';
import coffeeLogo from './resources/coffee.svg';

type CurrentStateDisplayProps = {
  logo: 'working' | 'coffee'
};

export default function CurrentStateDisplay(props: CurrentStateDisplayProps): JSX.Element {
  const { logo: logoName } = props;
  const logo = logoName === 'coffee' ? coffeeLogo : workingLogo;
  return <Image alt={logoName} src={logo.src} fill />;
}
