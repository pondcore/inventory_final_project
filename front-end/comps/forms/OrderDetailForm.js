import { Row, Col, Form, Radio, InputNumber, Typography, Button, Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import ProductTable from '@/comps/table/OrderProductTable'
import SelectProductModal from '@/comps/modals/SelectProductModal'
import React, { useState, useImperativeHandle, useRef } from 'react';

const { Title } = Typography;

function OrderDetailForm({
    onSubmit,
}, ref) {
    let { t } = useTranslation();
    const modalRef = useRef(null);
    const [orderShippingCost, setOrderShippingCost] = useState(0);
    const [orderDiscount, setOrderDiscount] = useState(0);
    const [productCost, setProductCost] = useState(0);
    const [visibleProductModal, setVisibleProductModal] = useState(false);
    const [productList, setProductList] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal: setVisibleProductModal,
        setSubmit: setLoadingSubmit,
        setProduct: setProductList,
        setProductCost: setProductCost,
        setOrderShippingCost: setOrderShippingCost,
        setOrderDiscount: setOrderDiscount,
        setSelectedProductKeys: modalRef.current.setSelectedProductKeys,
    }), [])

    const calculateProductCost = (newOrderProduct = undefined) => {
        let currProduct = newOrderProduct === undefined ? productList : newOrderProduct;
        let productSum = currProduct.reduce((acc, cur) => { return acc + (parseFloat(cur.price) * parseInt(cur.amount)) }, 0);
        setProductCost(productSum);
    }

    const amountChange = (recordId, value) => {
        let temp = [];
        productList.forEach(item => {
            temp.push({ ...item })
        })
        temp.forEach((prod, index) => {
            if (prod._id == recordId) {
                temp[index].amount = parseInt(value);
            }
        })
        calculateProductCost(temp);
        setProductList(temp);
    }

    return (<>
        <ProductTable productList={productList} amountChange={amountChange} />
        <Row gutter={16} justify="end">
            <Col xs={24} sm={8} md={6}>
                <Form.Item
                    name="shippingCost"
                    label={t('order:form.shippingCost')}
                    value={orderShippingCost}
                    rules={[
                        {
                            required: true,
                            message: t('validate:required', { text: t('order:form.shippingCost') })
                        }
                    ]}
                    initialValue="0"
                >
                    <InputNumber min={0} style={{ width: "100%" }} onChange={(val) => setOrderShippingCost(val)} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={8} md={6}>
                <Form.Item
                    name="discount"
                    label={t('order:form.discount')}
                    value={orderDiscount}
                    rules={[
                        {
                            required: true,
                            message: t('validate:required', { text: t('order:form.discount') })
                        }
                    ]}
                    initialValue="0"
                >
                    <InputNumber min={0} style={{ width: "100%" }} onChange={(val) => setOrderDiscount(val)} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16} justify="end">
            <Col xs={24} sm={8} md={6} style={{ display: 'flex', justifyContent: 'right' }}>
                <Form.Item
                    name="isPaid"
                    initialValue="1"
                >
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value="1" checked>{t('order:form.paymentComplete')}</Radio>
                            <Radio value="2">{t('order:form.paymentPending')}</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col xs={24} sm={8} md={6} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Title level={4}>{t('order:form.totalPrice')}</Title>
                </div>
                <div>
                    <Title level={4} type="success">฿{productCost + orderShippingCost - orderDiscount}</Title>
                </div>
            </Col>
        </Row>
        <Row justify="end">
            <Col>
                <Button
                    type="primary"
                    size="large"
                    onClick={() =>
                        onSubmit(productList, productCost, orderShippingCost, orderDiscount)}
                    loading={loadingSubmit}
                >
                    {t('common:form.submit')}
                </Button>
            </Col>
        </Row>
        <SelectProductModal
            ref={modalRef}
            visible={visibleProductModal}
            orderProducts={productList}
            calculatePrice={calculateProductCost}
            setProducts={setProductList}
            onClose={() => setVisibleProductModal(false)}
        />
    </>)
}

export default React.forwardRef(OrderDetailForm)
