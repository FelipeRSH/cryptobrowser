import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

import moment from 'moment/moment';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified }) {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

    useEffect(() => {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('pt')) {
            setNewsCategory('Criptomoeda');
        }

    }, []);
    useEffect(() => {
        if (simplified) {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('pt')) {
                setNewsCategory('Criptomoeda');
            } else {
                setNewsCategory('Cryptocurrency');
            }
        }
    }, [simplified, setNewsCategory]);
    const { t } = useTranslation();
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, contagem: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);
    if (!cryptoNews) return <Loader />;
    console.log(cryptoNews)

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (<Col span={24}>
                <Select
                    showSearch
                    className='select-news'
                    placeholder={t("Select a Crypto")}
                    onChange={(value) => {
                        const browserLang = navigator.language.toLowerCase();
                        if (browserLang.startsWith('pt')) {
                            setNewsCategory(value + '&setLang=pt-pt');
                        } else {
                            setNewsCategory(value);
                        }
                    }}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase())}>
                    {data?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option>)}
                </Select>
            </Col>)}
            {cryptoNews.value.map((news, i) => (<Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                    <a href={news.url} target='_blank' rel='noreferrer'>
                        <div className='news-image-container'>
                            <Title className='news-title' level={4}>{news?.name.substring(0, 100)}..
                            </Title>
                            <img style={{ maxWidth: '150px', maxHeight: '140px' }} src={news?.image?.thumbnail?.contentUrl || <HomeOutlined />} alt='news' width='85' height='85'>
                            </img>
                        </div>
                        <p>
                            {news.description.length > 180 ? `${news.description.substring(0, 200)}...` : news.description}
                        </p>
                        <div className='provider-container'>
                            <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || <HomeOutlined />}></Avatar>
                                <Text className='provider-name'>{news.provider[0]?.name}</Text>
                            </div>
                            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                        </div>
                    </a>
                </Card>
            </Col>))}
        </Row>
    )
}

export default News