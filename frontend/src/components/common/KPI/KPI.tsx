import { Card, Typography } from "antd";

const { Text, Title } = Typography;

interface KPIProps {

    title: string;

    value: string | number;

    color?: string;

    subtitle?: string;

}

export default function KPI({

    title,

    value,

    color = "#00D4FF",

    subtitle

}: KPIProps) {

    return (

        <Card
            bordered={false}
            
            styles={{
                body: { padding: 18 }
            }}
            style={{

                background: "#101B2D",

                borderRadius: 16,

                border: "1px solid #203B57",

                height: 140

            }}
        >

            <Text
                style={{
                    color: "#8AA1C1"
                }}
            >

                {title}

            </Text>

            <Title
                level={3}
                style={{
                    color,
                    marginTop: 12,
                    marginBottom: 4
                }}
            >

                {value}

            </Title>

            {

                subtitle &&

                <Text
                    style={{
                        color: "#7A8CA5"
                    }}
                >

                    {subtitle}

                </Text>

            }

        </Card>

    );

}