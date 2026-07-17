import { useEffect, useState } from "react";

const countries = [
  {
    country: "China",
    flag: "🇨🇳",
    severity: "Critical",
    color: "#FF4D4F"
  },
  {
    country: "Russia",
    flag: "🇷🇺",
    severity: "High",
    color: "#FF9800"
  },
  {
    country: "Pakistan",
    flag: "🇵🇰",
    severity: "Critical",
    color: "#FF4D4F"
  },
  {
    country: "North Korea",
    flag: "🇰🇵",
    severity: "High",
    color: "#FF9800"
  },
  {
    country: "Iran",
    flag: "🇮🇷",
    severity: "Medium",
    color: "#FFD54F"
  },
  {
    country: "USA",
    flag: "🇺🇸",
    severity: "Low",
    color: "#00E676"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    severity: "Low",
    color: "#00E676"
  },
  {
    country: "France",
    flag: "🇫🇷",
    severity: "Low",
    color: "#00E676"
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    severity: "Medium",
    color: "#FFD54F"
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    severity: "Low",
    color: "#00E676"
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    severity: "Low",
    color: "#00E676"
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    severity: "Medium",
    color: "#FFD54F"
  }
];

function generateRanking() {

  return countries
    .map(c => {

      const count = Math.floor(Math.random() * 130) + 20;

      return {

        ...c,

        count,

        trend: Math.random() > 0.5 ? "▲" : "▼"

      };

    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

}

export default function ThreatOriginRanking() {

  const [rows, setRows] = useState(generateRanking());

  useEffect(() => {

    const timer = setInterval(() => {

      setRows(generateRanking());

    }, 4000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div>

      {

        rows.map(row => {

          const percent = Math.min((row.count / 150) * 100, 100);

          return (

            <div
              key={row.country}
              style={{
                marginBottom: 22,
                paddingBottom: 18,
                borderBottom: "1px solid #22374D"
              }}
            >

              {/* Header */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 17
                    }}
                  >
                    {row.flag} {row.country}
                  </div>

                  <div
                    style={{
                      color: "#8FA8C3",
                      fontSize: 12
                    }}
                  >
                    Live Attack Volume
                  </div>

                </div>

                <div
                  style={{
                    textAlign: "right"
                  }}
                >

                  <div
                    style={{
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700
                    }}
                  >
                    {row.count}
                  </div>

                  <div
                    style={{
                      color: row.color,
                      fontSize: 13,
                      fontWeight: 600
                    }}
                  >
                    {row.trend}
                  </div>

                </div>

              </div>

              {/* Progress */}

              <div
                style={{
                  marginTop: 14,
                  height: 12,
                  background: "#2D415B",
                  borderRadius: 10,
                  overflow: "hidden"
                }}
              >

                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: row.color,
                    transition: "0.6s",
                    boxShadow: `0 0 12px ${row.color}`
                  }}
                />

              </div>

              {/* Footer */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8
                }}
              >

                <span
                  style={{
                    color: row.color,
                    fontSize: 13,
                    fontWeight: 600
                  }}
                >
                  {row.severity}
                </span>

                <span
                  style={{
                    color: "#7FA7D4",
                    fontSize: 13
                  }}
                >
                  Last 5 min
                </span>

              </div>

            </div>

          );

        })

      }

    </div>

  );

}