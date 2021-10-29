import React, { Component } from 'react'
import { Divider, Table, Row, Col } from 'antd';

export default class OrderCover extends Component {
    render() {
        const { order } = this.props;
        const customer = order.customer_id;
        const products = order.products.map(item => {
            return { amount: item.amount, ...item.id }
        })

        let prodCost = products.reduce((acc, cur) => {
            return acc + (cur.amount * cur.price);
        }, 0)
        let discount = prodCost - (order.total_price - order.shipping_cost)
        const columns = [
            {
                title: 'ลำดับ',
                key: 'index',
                width: '5%',
                render: (text, _, index) => index + 1,
            },
            {
                title: 'รายการ',
                dataIndex: 'product_name',
                key: 'product_name',
            },
            {
                title: 'จำนวนชิ้น',
                dataIndex: 'amount',
                width: '10%',
                key: 'amount'
            },
            {
                title: 'ราคา',
                dataIndex: 'price',
                width: '10%',
                key: 'price'
            },
        ]
        return (<div style={{ margin: '3rem' }}>
            <h3>หมายเลขออเดอร์: <span style={{ color: 'green' }}>{customer._id}</span></h3>
            <Divider dashed style={{ borderColor: '#000' }} />
            <h3>ผู้รับ</h3>
            <div style={{ marginLeft: '3rem' }}>
                {customer.prefix} {customer.firstname} {customer.lastname} <br />
                ที่อยู่: {customer.addr[0].description} {customer.addr[0].tambon_name} {customer.addr[0].amphur_name} {customer.addr[0].province_name} {customer.addr[0].post_code} <br />
                โทร: {customer.phone}
            </div>
            <Divider dashed style={{ borderColor: '#000' }} />
            <h3>รายการสั่งซื้อ</h3>
            <Table
                rowKey="_id"
                bordered
                dataSource={products}
                columns={columns}
                pagination={false}
                style={{ marginBottom: '2rem' }}
            />
            <Row justify="end" style={{ display: (order.shipping_cost > 0) ? 'flex' : 'none' }}>
                <Col xs={24} sm={5} md={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'right', width: '100px' }}>
                        <h4>ค่าจัดส่ง</h4>
                    </div>
                    <div>
                        <h4>฿{order.shipping_cost}</h4>
                    </div>
                </Col>
            </Row>
            <Row justify="end" style={{ display: (discount > 0) ? 'flex' : 'none' }}>
                <Col xs={24} sm={5} md={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'right', width: '100px' }}>
                        <h4>ส่วนลด</h4>
                    </div>
                    <div>
                        <h4>฿{discount}</h4>
                    </div>
                </Col>
            </Row>
            <Row justify="end">
                <Col xs={24} sm={5} md={4} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'right', width: '100px' }}>
                        <h2>ยอดรวม</h2>
                    </div>
                    <div>
                        <h2>฿{order.total_price}</h2>
                    </div>
                </Col>
            </Row>
            <Divider dashed style={{ borderColor: '#000' }} />

        </div>);
    }
}