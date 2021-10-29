import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import axios from '@/plugins/axios.config';
import { Bar, Pie } from 'react-chartjs-2';

export async function getServerSideProps(context) {
  const data = await axios.get(`/api/summary`);
  const data2 = await axios.get(`/api/product`);
  return {
    props: { summary: data.data, product: data2.data.products },
  }
}


const Home = ({ setBreadcrumb, summary, product }) => {
  let { t } = useTranslation();

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(product)
  const state = {
    labels: [...product.map(label => label.product_name)],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        borderColor: 'rgba(0,0,0,1)',
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
        ],
        borderWidth: 2,
        data: [...product.map(label => summary.productAmountMonth[label._id])]
      }
    ]
  }

  return (
    <div style={{ marginBottom: '8rem' }}>
      <Row>
        <Col span={12}>
          <div style={{ border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <Row style={{ margin: '1rem' }}>
              <Col span={24}>
                <h1>สรุปยอดขาย</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.todaySummary.toFixed(2))} บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.weekSummary.toFixed(2))} บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.monthSummary.toFixed(2))} บาท</h4>
                      <h4>เดือนนี้</h4>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <Row style={{ margin: '1rem' }}>
              <Col span={24}>
                <h1>กำไร</h1>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.todayProfit.toFixed(2))} บาท</h4>
                      <h4>วันนี้</h4>
                    </div>
                  </Col>
                  <Col span={8} style={{ borderRight: '1px solid gray' }}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.weekProfit.toFixed(2))} บาท</h4>
                      <h4>สัปดาห์นี้</h4>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ margin: '1rem' }}>
                      <h4>{formatNumber(summary.monthProfit.toFixed(2))} บาท</h4>
                      <h4>เดือนนี้</h4>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <div style={{ width: "100%", border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <h1 style={{ margin: '1rem' }}>จำนวนสินค้าที่เหลืออยู่(แบบกราฟแท่ง)</h1>
            <Bar
              data={state}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <div style={{ height: "100%", border: '1px solid gray', borderRadius: '15px', margin: '1rem' }}>
            <h1 style={{ margin: '1rem' }}>จำนวนสินค้าที่เหลืออยู่(แบบกราฟวงกลม)</h1>
            <Pie
              data={state}
              options={{
                title: {
                  display: true,
                  text: 'Average Rainfall per month',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'right'
                }
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;