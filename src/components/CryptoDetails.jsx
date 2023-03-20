import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, WalletFilled, WalletOutlined, WalletTwoTone } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {
  const { t } = useTranslation();
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, refetch } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  console.log(coinHistory)
  useEffect(() => {
    refetch();
  }, [timePeriod]);

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if (isFetching) return <Loader />;
  const cryptoDetails = data?.data.coin;
  console.log(cryptoDetails)
  const stats = [
    { title: t('Price to USD'), value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: t('Rank'), value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: t('24h Volume'), value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: t('Market Cap'), value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: t('All-time-high(daily avg.)'), value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  const genericStats = [
    { title: t('Number Of Markets'), value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: t('Number Of Exchanges'), value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: t('Aprroved Supply'), value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <WalletFilled /> },
    { title: t('Total Supply'), value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <WalletOutlined /> },
    { title: t('Circulating Supply'), value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <WalletTwoTone /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} - {t('Price')} ({cryptoDetails.symbol})
        </Title>
        <p>
          {cryptoDetails.name} {t("live price in US dollars. View Value Statistics, market cap and supply.")}
        </p>
        <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => { setTimePeriod(value); console.log(value) }}>
          {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>
        <LineChart coinId={coinId} timePeriod={timePeriod} coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails.name}></LineChart>
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">{cryptoDetails.name} {t('Value Statistics')}</Title>
              <p>{t('An overview showing the statistics of')} {cryptoDetails.name}, {t('such as the base and quote currency, the rank, and trading volume.')}</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">{t('Other Stats')}</Title>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className='coin-desc-link'>
          <Row className='coin-desc'>
            <Title level={3} className='coin-details-heading'>
              {t('What is')} {cryptoDetails.name} ? <br></br><br></br>
              <p>{HTMLReactParser(cryptoDetails.description).toLocaleString('pt-br')}</p>
            </Title>
          </Row>

          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
            {cryptoDetails.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </Row>
            ))}
          </Col></Col>
      </Col>
    </Col >
  )
}

export default CryptoDetails