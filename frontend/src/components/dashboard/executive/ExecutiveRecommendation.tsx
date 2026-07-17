import { Tag } from "antd";
import EnterpriseCard from "../../common/EnterpriseCard/EnterpriseCard";
import { useEffect, useState } from "react";

const recommendations = [
  "Immediately isolate affected endpoints.",
  "Block outbound communication to suspicious IPs.",
  "Execute PB-010 Aggressive containment.",
  "Deploy IOC signatures enterprise-wide.",
  "Increase monitoring on Government Cloud.",
  "Escalate incident to Tier-3 analysts.",
  "Enable adaptive firewall policy.",
  "Rotate compromised credentials immediately.",
];

export default function ExecutiveRecommendation() {
  const [text, setText] = useState(recommendations[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setText(
        recommendations[
          Math.floor(Math.random() * recommendations.length)
        ]
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <EnterpriseCard title="AI Recommendation" height={230}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <Tag
          color="green"
          style={{
            borderRadius: 20,
            padding: "4px 14px",
            fontWeight: 700,
          }}
        >
          APPROVED
        </Tag>

        <div
          style={{
            color: "#7EC8FF",
            fontWeight: 600,
          }}
        >
          Confidence 96%
        </div>
      </div>

      <div
        style={{
          color: "#FFFFFF",
          fontSize: 20,
          lineHeight: 1.7,
          fontWeight: 500,
        }}
      >
        {text}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 22,
        }}
      >
        <Tag color="red">Contain</Tag>

        <Tag color="orange">
          PB-010 Aggressive
        </Tag>

        <Tag color="blue">
          SOAR Ready
        </Tag>

        <Tag color="cyan">
          Blast Radius Safe
        </Tag>

        <Tag color="green">
          Auto Isolation Approved
        </Tag>
      </div>
    </EnterpriseCard>
  );
}