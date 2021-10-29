import { Row, Col, InputNumber, Avatar, Table } from 'antd';

function OrderProductTable({ amountChange, productList }) {

    const columns = [
        {
            title: '#',
            key: 'index',
            width: '5%',
            render: (text, _, index) => index + 1,
        },
        {
            title: 'รูป',
            dataIndex: 'image',
            align: 'center',
            key: 'image',
            render: function avatar(image) {
                return (<Avatar
                    size={64}
                    src={image}
                    alt=""
                />)
            }
        },
        {
            title: 'ชื่อสินค้า',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'รหัส SKU',
            dataIndex: 'sku',
            key: 'sku',
        },
        {
            title: 'ราคา/บาท',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'จำนวน',
            dataIndex: 'amount',
            width: '10%',
            key: 'amount',
            render: function amountInput(text, record) {
                return (<InputNumber min={1} max={record.qty} value={record.amount} onChange={(value) => amountChange(record._id, value)} />)
            }
        },
    ];

    return (<>
        <Row style={{ margin: "0.8rem 0" }}>
            <Col span={24}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={productList}
                    columns={columns}
                    tableLayout="auto"
                />
            </Col>
        </Row>
    </>)
}

export default OrderProductTable
