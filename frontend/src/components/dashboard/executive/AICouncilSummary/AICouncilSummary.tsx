import { Button, Progress, Tag } from "antd";
import EnterpriseCard from "../../../common/EnterpriseCard/EnterpriseCard";
import { useEffect, useState } from "react";

const playbooks = [
  "PB-010 Aggressive",
  "PB-021 Isolation",
  "PB-006 Containment",
  "PB-015 Zero Trust",
];

const risks = [
  "Low",
  "Medium",
  "High",
];

export default function AICouncilSummary() {
  const [agreement, setAgreement] = useState(96);
  const [models, setModels] = useState(7);
  const [risk, setRisk] = useState("Medium");
  const [playbook, setPlaybook] = useState(playbooks[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setAgreement(92 + Math.floor(Math.random() * 8));

      setModels(6 + Math.floor(Math.random() * 3));

      setRisk(
        risks[
          Math.floor(Math.random() * risks.length)
        ]
      );

      setPlaybook(
        playbooks[
          Math.floor(Math.random() * playbooks.length)
        ]
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <EnterpriseCard
      title="AI Council"
      height={500}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              color: "#8EA9CC",
            }}
          >
            Consensus
          </div>

          <div
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 54,
            }}
          >
            {agreement}%
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <Tag color="green">
            APPROVED
          </Tag>

          <div
            style={{
              color: "#8EA9CC",
              marginTop: 8,
            }}
          >
            {models} / 8 Models
          </div>
        </div>
      </div>

      <Progress
        percent={agreement}
        showInfo={false}
        strokeColor="#00E676"
        trailColor="#22384D"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 22,
        }}
      >
        <div
          style={{
            background: "#17263C",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ color: "#8EA9CC" }}>
            Winning Playbook
          </div>

          <div
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {playbook}
          </div>
        </div>

        <div
          style={{
            background: "#17263C",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ color: "#8EA9CC" }}>
            Risk
          </div>

          <div
            style={{
              color: "#FFD54F",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {risk}
          </div>
        </div>

        <div
          style={{
            background: "#17263C",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ color: "#8EA9CC" }}>
            Dissenting Models
          </div>

          <div
            style={{
              color: "#FF9800",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {8 - models}
          </div>
        </div>

        <div
          style={{
            background: "#17263C",
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ color: "#8EA9CC" }}>
            Execution
          </div>

          <div
            style={{
              color: "#00E676",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            READY
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <Tag color="green">SOAR</Tag>

        <Tag color="blue">
          Oracle AI
        </Tag>

        <Tag color="purple">
          Sentinel
        </Tag>

        <Tag color="cyan">
          Behaviour AI
        </Tag>
      </div>

      <Button
        block
        type="primary"
        size="large"
        style={{
          marginTop: 22,
          height: 48,
          fontWeight: 700,
        }}
      >
        Open AI Council
      </Button>
    </EnterpriseCard>
  );
}