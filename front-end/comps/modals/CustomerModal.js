import { Modal, Row, Col, Form, Input, Select, Spin } from 'antd';
import UploadBlock from '@/comps/forms/UploadBlock';
import useTranslation from 'next-translate/useTranslation';
import ADDRESS_DATA from '@/constants/addressData';

import React, { useState } from 'react';

const { Option } = Select;
const { TextArea } = Input;

const CustomerModal = ({ form, visible, onSubmit, onClose, confirmLoading, imageUrl = "", setImageUrl, loadingModal = false, modalType = 'create' }) => {
    const [districts, setDistricts] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);

    let { t } = useTranslation();

    const onProvinceSelect = (value) => {
        form.resetFields(['district', 'subdistrict'])
        setDistricts(ADDRESS_DATA[value]);
    }

    const onDistrictSelect = (value) => {
        let province = form.getFieldValue('province')
        form.resetFields(['subdistrict'])
        setSubdistricts(ADDRESS_DATA[province][value]);
    }

    return (<Modal
        centered
        title={modalType == 'create' ? t('common:createTitle', { text: t('customer:title') }) : t('common:editTitle', { text: t('customer:title') })}
        visible={visible}
        onOk={() => onSubmit(modalType)}
        okText={t('common:form.submit')}
        onCancel={onClose}
        cancelText={t('common:form.cancel')}
        confirmLoading={confirmLoading}
        width={860}
        forceRender
    >
        <Spin tip="Loading..." spinning={loadingModal}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={10}>
                    <div style={{ marginBottom: "6px" }}>
                        {t('customer:form.image')}
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <UploadBlock imageUrl={imageUrl} setImageUrl={setImageUrl} button={t('customer:form.image_upload_button')} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={14}>
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        size="small"
                        form={form}
                    >
                        <Form.Item
                            name="addrId"
                            noStyle
                        >
                            <Input type="hidden" />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="prefix"
                                    label={t('customer:form.prefix')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.prefix') })
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="firstname"
                                    label={t('customer:form.first_name')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.first_name') })
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="lastname"
                                    label={t('customer:form.last_name')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.last_name') })
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="phone"
                                    label={t('customer:form.phone')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.phone') })
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]*$/g),
                                            message: t('validate:number', { text: t('customer:form.phone') })

                                        }
                                    ]}
                                >
                                    <Input placeholder="0987654321" maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="province"
                                    label={t('customer:form.province')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.province') })
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder={t('common:form.select_default')}
                                        onChange={onProvinceSelect}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {Object.keys(ADDRESS_DATA).map((item, index) =>
                                            <Option key={index} value={item}>{item}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="district"
                                    label={t('customer:form.district')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.district') })
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder={t('common:form.select_default')}
                                        onChange={onDistrictSelect}
                                        disabled={form.getFieldValue('province') == null}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {Object.keys(districts).map((item, index) =>
                                            <Option key={index} value={item}>{item}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="12">
                                <Form.Item
                                    name="subdistrict"
                                    label={t('customer:form.sub_district')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.sub_district') })
                                        }
                                    ]}
                                >
                                    <Select
                                        placeholder={t('common:form.select_default')}
                                        disabled={form.getFieldValue('district') == null}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {subdistricts.map((item, index) =>
                                            <Option key={index} value={item}>{item}</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="postcode"
                                    label={t('customer:form.postcode')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('validate:required', { text: t('customer:form.postcode') })
                                        }, {
                                            pattern: new RegExp(/^[0-9]*$/g),
                                            message: t('validate:number', { text: t('customer:form.postcode') })

                                        }
                                    ]}
                                >
                                    <Input maxLength={5} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span="24">
                                <Form.Item
                                    name="address"
                                    label={t('customer:form.address')}
                                >
                                    <TextArea
                                        placeholder={t('customer:form.addressPlaceholder')}
                                        autoSize={{ minRows: 3, maxRows: 6 }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Spin>
    </Modal >);
}

export default CustomerModal;