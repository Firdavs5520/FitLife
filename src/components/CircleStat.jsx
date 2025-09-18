import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircleStat({ value, label, color }) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="w-28 h-28">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: color,
            trailColor: "#374151",
          })}
        />
      </div>
      <p className="text-gray-300 text-center text-sm">{label}</p>
    </div>
  );
}
