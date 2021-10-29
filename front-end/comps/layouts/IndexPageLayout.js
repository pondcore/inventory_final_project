import { Button, Row, Col, Input, Select } from 'antd';
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation';

const { Search } = Input;
const { Option } = Select;

const IndexPageLayout = ({ children, title, onSearch, onCreate, optionSearch = null, setOptionSearch = null }) => {
    let { t } = useTranslation();
    const handleSearchSelect = (option) => {
        setOptionSearch(option.value);
    }

    return (
        <>
            <Head>
                <title>{t('common:page_title', { text: title })}</title>
            </Head>
            <Row>
                <Col span={12}>
                    <Input.Group compact>
                        {optionSearch ?
                            (<Select
                                labelInValue
                                defaultValue={optionSearch[0]}
                                size="large"
                                onChange={handleSearchSelect}
                            >
                                {optionSearch.map((opt, index) =>
                                    <Option key={index} value={opt.value}>{opt.title}</Option>
                                )}
                            </Select>) : null}
                        <Search
                            size="large"
                            placeholder={t('common:search_input', { text: title })}
                            allowClear
                            onSearch={onSearch}
                            style={{
                                width: 300,
                            }}
                        />
                    </Input.Group>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Button size={"large"} type="primary" onClick={onCreate}>
                        {t('common:createButton', { text: title })}
                    </Button>
                </Col>
            </Row>
            <div className="page-header"><h1>{t('common:page_title', { text: title })}</h1></div>
            {children}
        </>
    )
}

export default IndexPageLayout;