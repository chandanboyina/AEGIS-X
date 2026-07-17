import React from "react";
import { Row, Col, Typography, Space, Divider, Tag } from "antd";
import {
  Dna,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import DNAKPIs from "./components/DNAKPIs";
import GenomeHero from "./components/GenomeHero";
import GenomeRadar from "./components/GenomeRadar";
import GenomeEventBus from "./components/GenomeEventBus";
import GenomePredictions from "./components/GenomePredictions";
import GenomeOracle from "./components/GenomeOracle";

const { Title, Paragraph } = Typography;

const CyberDNA: React.FC = () => {
  return (
    <div
      style={{
        padding: "32px",
        background: "#070B14",
        minHeight: "100vh",
      }}
    >
      {/* ================= HEADER ================= */}

      <Row justify="space-between" align="middle">
        <Col xs={24} lg={16}>
          <Space
            direction="vertical"
            size={10}
            style={{ width: "100%" }}
          >
            <Tag
              color="cyan"
              style={{
                width: "fit-content",
                padding: "6px 14px",
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              Enterprise Cyber Intelligence
            </Tag>

            <Title
              level={1}
              style={{
                color: "#FFFFFF",
                marginBottom: 0,
                fontWeight: 700,
              }}
            >
              Cyber DNA
            </Title>

            <Paragraph
              style={{
                color: "#9AA4BF",
                fontSize: 16,
                maxWidth: 820,
                marginBottom: 0,
                lineHeight: 1.8,
              }}
            >
              Cyber DNA creates a living enterprise genome by continuously
              analysing identities, devices, applications, cloud workloads,
              behaviours and threat intelligence. Oracle AI correlates every
              security signal to predict attacks, understand behavioural
              evolution and autonomously recommend defensive actions before
              business impact occurs.
            </Paragraph>
          </Space>
        </Col>

        <Col xs={24} lg={8}>
          <Row
            justify="end"
            gutter={16}
            style={{ marginTop: 20 }}
          >
            <Col>
              <Tag
                color="green"
                style={{
                  padding: "8px 14px",
                  borderRadius: 18,
                }}
              >
                <ShieldCheck size={16} />
                &nbsp; Secure
              </Tag>
            </Col>

            <Col>
              <Tag
                color="processing"
                style={{
                  padding: "8px 14px",
                  borderRadius: 18,
                }}
              >
                <Sparkles size={16} />
                &nbsp; Oracle AI
              </Tag>
            </Col>

            <Col>
              <Tag
                color="purple"
                style={{
                  padding: "8px 14px",
                  borderRadius: 18,
                }}
              >
                <Dna size={16} />
                &nbsp; Genome Live
              </Tag>
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider
        style={{
          borderColor: "#1F2937",
          margin: "28px 0 32px",
        }}
      />

      {/* ================= KPI ================= */}

      <DNAKPIs />

      <div style={{ height: 30 }} />

      {/* ================= HERO ================= */}

      <GenomeHero />

      <div style={{ height: 30 }} />

      {/* ================= THREAT RADAR ================= */}

      <GenomeRadar />

      <div style={{ height: 30 }} />

      {/* ================= EVENT BUS ================= */}

      <GenomeEventBus />

      <div style={{ height: 30 }} />

      {/* ================= PREDICTIONS ================= */}

      <GenomePredictions />

      <div style={{ height: 30 }} />

      {/* ================= ORACLE ================= */}

      <GenomeOracle />
    </div>
  );
};

export default CyberDNA;