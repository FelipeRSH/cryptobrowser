import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
function Cryptocurrencies({ simplified }) {
    const { t } = useTranslation();
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (<div className='search-crypto'>
                <Input placeholder={t('Search Cryptocurrency')} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>)}

            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map(currency => (<Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                    <Link to={`/crypto/${currency.uuid}`} >
                        <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img alt='cryptoimg' className='crypto-image' src={currency.iconUrl} />}
                            hoverable
                        >
                            <p>{t('Price')}: U${millify(currency.price)}  </p>
                            <p>{t('MarketCap')}: {millify(currency.marketCap)} </p>
                            <p>{t('DailyChange')}: {millify(currency.change)} %</p>

                        </Card>

                    </Link>
                </Col>))}
            </Row>
        </>
    )
}

export default Cryptocurrencies