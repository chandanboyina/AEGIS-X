import { Input, Space, Button } from "antd";

export default function IncidentFilters(){

    return(

        <Space
            wrap
            style={{

                width:"100%",

                marginBottom:25

            }}
        >

            <Input.Search

                placeholder="Search Incident"

                style={{

                    width:280

                }}

            />

            <Button>All</Button>

            <Button danger>Critical</Button>

            <Button>High</Button>

            <Button>Medium</Button>

            <Button>Low</Button>

            <Button>Resolved</Button>

        </Space>

    );

}