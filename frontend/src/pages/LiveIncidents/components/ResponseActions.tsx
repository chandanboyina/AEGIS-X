import EnterpriseCard from "../../../components/common/EnterpriseCard/EnterpriseCard";
import { Button } from "antd";

export default function ResponseActions(){

return(

<EnterpriseCard
title="Response Actions"
height={350}
>

<Button block type="primary">
Isolate Endpoint
</Button>

<div style={{height:12}}/>

<Button block danger>
Block IP
</Button>

<div style={{height:12}}/>

<Button block>
Reset Password
</Button>

<div style={{height:12}}/>

<Button block>
Disable User
</Button>

<div style={{height:12}}/>

<Button block>
Notify SOC
</Button>

</EnterpriseCard>

);

}