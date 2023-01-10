type PrettyTimeProps = {
  time: number
  mode: 'time' | 'date' | 'date-and-time'
};

export default function PrettyTime(props: PrettyTimeProps) {
  const { time, mode } = props;
  const date = new Date(time);
  const timeElement = (
    <div>
      {date.getHours()}
      :
      {date.getMinutes().toString().padStart(2, '0')}
    </div>
  );

  const dateElement = (
    <div>
      {date.getDate().toString().padStart(2, '0')}
      .
      {(date.getMonth() + 1).toString().padStart(2, '0')}
      .
      {date.getFullYear()}
    </div>
  );

  return mode === 'date' ? dateElement : timeElement;
}
