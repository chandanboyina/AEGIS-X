import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";
import { useEffect, useState } from "react";

const colors = [
  "#FFD54F",
  "#40A9FF",
  "#00E676",
  "#FF9800",
];

const titles = [
  "Reconnaissance Detected",
  "Oracle AI Classified Behaviour",
  "AI Council Reached Consensus",
  "SOAR Playbook Selected",
  "Endpoint Isolated",
  "Threat Neutralized",
  "Firewall Updated",
  "IOC Shared",
  "Malware Removed",
];

export default function ExecutiveTimeline() {
  const [events, setEvents] = useState([
    {
      time: "14:20",
      title: "Reconnaissance Detected",
      color: "#FFD54F",
    },
    {
      time: "14:21",
      title: "Oracle AI Classified Behaviour",
      color: "#40A9FF",
    },
    {
      time: "14:22",
      title: "AI Council Reached Consensus",
      color: "#00E676",
    },
    {
      time: "14:23",
      title: "SOAR Playbook Selected",
      color: "#00E676",
    },
    {
      time: "14:24",
      title: "Containment Complete",
      color: "#00E676",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((old) => {
        const updated = [...old];

        updated.shift();

        const now = new Date();

        updated.push({
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          title:
            titles[
              Math.floor(Math.random() * titles.length)
            ],
          color:
            colors[
              Math.floor(Math.random() * colors.length)
            ],
        });

        return updated;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <EnterpriseCard
      title="Executive Timeline"
      height={500}
    >
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 70,
              color: "#7EC8FF",
              fontWeight: 700,
            }}
          >
            {event.time}
          </div>

          <div
            style={{
              width: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: event.color,
                boxShadow: `0 0 18px ${event.color}`,
              }}
            />

            {index !== events.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 46,
                  background: "#28415D",
                }}
              />
            )}
          </div>

          <div
            style={{
              color: "#FFFFFF",
              fontSize: 18,
            }}
          >
            {event.title}
          </div>
        </div>
      ))}
    </EnterpriseCard>
  );
}