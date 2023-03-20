import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { ExpandAltOutlined } from '@ant-design/icons'
import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>{t('Exchanges')}</Col>
        <Col span={6}>{t('24h Trade Volume')}</Col>
        <Col span={6}>{t('Markets')}</Col>
        <Col span={6}>{t('Recommended')}</Col>
      </Row>
      <br></br>
      <Row>
        {
          exchangesList.map((exchange) => (
            <Col span={24}>
              <Collapse>
                <Panel
                  key={exchange.uuid}
                  showArrow={false}
                  header={(
                    <Row key={exchange.uuid}>
                      <Col span={6}>
                        <Text><strong>{exchange.rank}.</strong></Text>
                        <Avatar className="exchange-image" src={exchange.iconUrl} />
                        <Text><strong>{exchange.name}</strong></Text>
                      </Col>
                      <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                      <Col span={5}>{t(millify(exchange.recommended))}</Col>
                      <Col span={1}>{<ExpandAltOutlined />}</Col>
                    </Row>

                  )
                  }
                >
                  {HTMLReactParser(exchange.coinrankingUrl || '')}
                </Panel>

              </Collapse>
              <br></br>
            </Col>
          ))
        }
      </Row>
    </>
  );
};
export default Exchanges