import {Button, Card, Progress, Slider, Table} from "antd";
import data from '../helpers/data.json'
import { useState} from "react";
import {statuses} from "../helpers/statuses";
import ModalWrapper from "../component/Modal";
import moment from "moment";
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const MyTable = () => {
    const [isStatusModalOpen, setStatusModalOpen] = useState(false)
    const [isPercentModalOpen, setPercentModalOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [percentage, setPercentage] = useState(0)
    const [tableData, setTableData] = useState(data);
    const columns = [
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
            sorter: (a, b) => {
                const first = moment(a.startDate, 'DD.MM.YYYY');
                const second = moment(b.startDate, 'DD.MM.YYYY');
                if (first.isBefore(second)) return -1;
                if (first.isAfter(second)) return 1;
                return 0;
            },
            sortDirections: ['ascend', 'descend'],
            width: "20%",
        },
        {
            title: "Revenue",
            dataIndex: "revenue",
            sorter: (a,b)=> a.revenue - b.revenue,
            width: "22%",
        },
        {
            title: "Status",
            dataIndex: "status",
            filters: [...statuses.map((i) => ({ text: i.toUpperCase(), value: i }))],
            filterMode: 'tree',
            onFilter: (value: string, record) => record.status.includes(value),
            width: "20%",
            render: (data, record) => (
                <div className={`status-item ${data.toLowerCase()}`} onClick={()=>handleClickStatus(record)}>{data}</div>
            ),
        },
        {
            title: "Percent of completion",
            dataIndex: "percentCompletion",
            sorter: (a,b)=> a.percentCompletion - b.percentCompletion,
            width: "20%",
            render: (data, record) => (
                <Progress type="circle" percent={data} size={70} onClick={()=>handleClickPercentage(record)}/>
            )
        },
        {
            title: "Margin",
            dataIndex: "margin",
            sorter: (a,b)=> a.margin - b.margin,
            render: data => (
                <Button danger={data < 0}  >
                    {data}
                </Button>
            )
        },
    ];

    const handleClickStatus = (record) =>{
            setStatusModalOpen(!isStatusModalOpen)
            setSelectedRow(record)
        }

    const onStatusSelect = (status) => {
        const updatedData = tableData.map((item) => {
            if (item.key === selectedRow.key) {
                return { ...item, status };
            }
            return item;
        });
        setTableData(updatedData);
        setStatusModalOpen(false)
    }

    const handleClickPercentage = (record) =>{
        setPercentage(record.percentCompletion)
        setPercentModalOpen(!isPercentModalOpen)
        setSelectedRow(record)
    }

    const handleChangePercentage = (percentCompletion) =>{
        setPercentage()
        const updatedRecord =tableData.map((item) =>{
            if (item.key === selectedRow.key){
                return{...item, percentCompletion}
            }
            return item
        })
        setTableData(updatedRecord)
    }

    return (
        <Card>
            <Table columns={columns} dataSource={tableData} />
            <ModalWrapper isOpen={isStatusModalOpen} setOpen={()=>setStatusModalOpen(!isStatusModalOpen)} title={'Select status'}>
                <div className="status-wrapper">
                    {statuses.map((status) => (
                        <div
                            key={status}
                            className={`status-item ${status}`}
                            onClick={() => onStatusSelect(status)}
                        >
                            {status}
                        </div>
                    ))}
                </div>
            </ModalWrapper>
            <ModalWrapper isOpen={isPercentModalOpen} setOpen={()=>setPercentModalOpen(!isPercentModalOpen)} title={'Change percentage'}>
                <div>
                    <Slider value={percentage} onChange={(value)=>handleChangePercentage(value)}/>
                </div>
            </ModalWrapper>
        </Card>
        );

}
export default MyTable;