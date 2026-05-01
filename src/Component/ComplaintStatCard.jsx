import { useEffect, useState } from "react";
import styles from "../pages/CitizenDashboard.module.css";
import {
  AiOutlineCheck,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";

function ComplaintStatCard({
  title = "Resolved",
  value = 0,
  trend = "",
  trendValue = null,
  Icon = AiOutlineCheck,
  iconSize = 24,
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const end = Number(value) || 0;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    let start = 0;
    const duration = 600; // ms
    const frameDuration = 16;
    const totalFrames = Math.round(duration / frameDuration);
    const increment = end / totalFrames;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      start = Math.round(increment * frame);
      if (frame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(id);
      } else setDisplayValue(start);
    }, frameDuration);
    return () => clearInterval(id);
  }, [value]);

  const lc = title.toLowerCase();
  let themeColor = "#10B981"; // green
  if (lc.includes("pending")) themeColor = "#F59E0B"; // amber
  if (lc.includes("rejected") || lc.includes("denied") || lc.includes("cancel"))
    themeColor = "#EF4444"; // red
  if (lc.includes("in-progress") || lc.includes("progress"))
    themeColor = "#3B82F6"; // blue

  const TrendIcon =
    trendValue != null
      ? trendValue >= 0
        ? AiOutlineArrowUp
        : AiOutlineArrowDown
      : null;

  return (
    <div
      className={styles.statCard}
      style={{ borderLeft: `4px solid ${themeColor}` }}
    >
      <div className={styles.statLeft}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{displayValue}</p>

        <div className={styles.trendWrap}>
          {trendValue != null ? (
            <span
              className={trendValue >= 0 ? styles.trendUp : styles.trendDown}
            >
              <TrendIcon /> <strong>{Math.abs(trendValue)}%</strong>
            </span>
          ) : (
            <span className={styles.trendText}>{trend}</span>
          )}
        </div>
      </div>

      <div
        className={styles.iconWrap}
        style={{
          background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}12)`,
        }}
      >
        <Icon
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            color: themeColor,
          }}
        />
      </div>
    </div>
  );
}

export default ComplaintStatCard;
