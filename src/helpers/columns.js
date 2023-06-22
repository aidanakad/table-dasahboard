import {statuses} from "./statuses";
import {Button, Progress} from "antd";

export const columns = [
    {
        title: "Client",
        dataIndex: "client",
        sorter: (a, b) => a.client.localeCompare(b.client),
        width: "20%",
    },
    {
        title: "Project",
        dataIndex: "project",
        sorter: (a, b) => a.project.localeCompare(b.project),
        width: "20%",
    },
    {
        title: "Start Date",
        dataIndex: "startDate",
        sorter: true,
        width: "20%",
    },
    {
        title: "Revenue",
        dataIndex: "revenue",
        sorter: true,
        width: "22%",
    },
    {
        title: "Status",
        dataIndex: "status",
        filters: [...statuses.map((i) => ({ text: i.toUpperCase(), value: i }))],
        width: "20%",
        render: (data) => (
            <div className={`status-item ${data.toLowerCase()}`} >{data}</div>
        ),
    },
    {
        title: "Percent of completion",
        dataIndex: "percentCompletion",
        sorter: true,
        width: "20%",
        render: data => (
            <Progress type="circle" percent={data} size={70}/>
        )
    },
    {
        title: "Margin",
        dataIndex: "margin",
        sorter: true,
        render: data => (
            <Button danger={data < 0}  >
                {data}
            </Button>
        )
    },
];