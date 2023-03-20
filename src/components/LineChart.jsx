import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod, coinId }) => {
    const [chartData, setChartData] = useState(null);

    const { data } = useGetCryptoHistoryQuery({ coinId, timePeriod });
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            var coinPrice = data.data.history.map(item => item.price).reverse();
            var coinTimestamp = data.data.history.map(item => new Date(item.timestamp * 1000).toLocaleDateString()).reverse();
            setChartData({
                labels: coinTimestamp,
                datasets: [
                    {
                        label: t('Price In USD'),
                        data: coinPrice,

                    },
                ],
            });
        }
    }, [data, coinId, timePeriod]);

    if (!chartData) return <Loader />;

    const options = {

        stacked: true,
        borderWidth: .5,
        data: data,
        scales: {
            x: {
                min: 20,
                maxTicksLimit: .1,
                ticks: {
                    beginAtZero: true
                }
            }
        },
        responsive: true,
        caretColor: 'green',
        title: {
            display: true,
            text: 'My Line Chart'
        },
        layout: {
            padding: {
                left: '50%',
                right: '50%',
                top: '20%',
                bottom: '50%'
            }
        },
        tooltips: {
            enabled: false
        },
        labels: {
            fontColor: 'black',
            maxTicksLimit: 2
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} {t('Price Chart')} </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">{t('Change:')} {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">{t('Current')} {coinName} {t('Price')}: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line key={`${coinId}-${timePeriod}`} data={chartData} options={options} />
        </>
    );
};


export default LineChart;