import workingLogo from './resources/working.svg';
import coffeeLogo from './resources/coffee.svg';
import Image from 'next/image';

type CurrentStateDisplayProps = {
    logo: 'working' | 'coffee'
}

export default function CurrentStateDisplay(props: CurrentStateDisplayProps): JSX.Element {
    const logo = props.logo === 'coffee' ? coffeeLogo : workingLogo
    return <Image alt={props.logo} src={logo.src} fill />
}