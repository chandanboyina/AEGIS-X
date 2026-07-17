import { Typography } from "antd";

const { Title } = Typography;

interface Props{

    title:string;

    subtitle?:string;

}

export default function SectionTitle({

    title,

    subtitle

}:Props){

    return(

        <div>

            <Title

                level={4}

                style={{

                    color:"white",

                    marginBottom:0

                }}

            >

                {title}

            </Title>

            <div

                style={{

                    color:"#8AA1C1",

                    fontSize:13

                }}

            >

                {subtitle}

            </div>

        </div>

    );

}