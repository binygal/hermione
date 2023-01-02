import CurrentStateDisplay from "../components/CurrentStateDisplay";
import Header from "../components/Header";
import StartNowButton from "../components/StartNowButton";
import styles from '../../styles/Home.module.css'
import { useState } from "react";
import ElapsingTime from "../components/ElapsingTime";
import Message from "../components/Message";

export default function TimeTrackerContainer() {
    const [isWorking, setIsWorking] = useState(false)
    const renderData = {
        logo: isWorking ? 'working' : 'coffee' as 'working' | 'coffee',
        title: isWorking ? 'stop' : 'start'
    }
    return <div className={styles.content}>
        <Header content='Time tracking' />
        <div className={styles.containerItem}>
            <CurrentStateDisplay logo={renderData.logo} />
        </div>
        {isWorking ? <ElapsingTime hours={5} minutes={45} /> : <Message message="Start to see elapsing time" />}
        <StartNowButton onClick={() => setIsWorking(!isWorking)} title={renderData.title}/>
    </div>
}