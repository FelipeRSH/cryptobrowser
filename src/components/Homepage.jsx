import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

function Homepage() {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    const { t } = useTranslation();
    if (isFetching) return <Loader />
    return (
        <>
            <Title level={2} className='heading' style={{ textAlign: 'CENTER', fontSize: '35px' }}>{t('Global Crypto Information')}</Title><br></br>
            <Row>
                <Col span={12}><Statistic title={t('Total Cryptocurrencies')} value={globalStats.total}></Statistic></Col>
                <Col span={12}><Statistic title={t('Total Exchanges')} value={millify(globalStats.totalExchanges)}></Statistic></Col>
                <Col span={12}><Statistic title={t('Total MarketCap')} value={millify(globalStats.totalMarketCap)}></Statistic></Col>
                <Col span={12}><Statistic title={t('Total 24h volume')} value={millify(globalStats.total24hVolume)}></Statistic></Col>
                <Col span={12}><Statistic title={t('Total Markets')} value={millify(globalStats.totalMarkets)}></Statistic></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>
                    {t('Top 10 Cryptocurrencies in the world')}
                </Title>
                <Title level={2} className='home-title'>
                    <Link to='/cryptocurrencies'>{t('Show more')}</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>{t('Latest Crypto News')}</Title>
                <Title level={2} className='home-title'><Link to='/news'>{t('Show More')}</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage