import React from 'react'
import {Routes,Route,Link} from 'react-router-dom';
import {Layout,Typography,Space} from 'antd';
import './App.css'; 
import {Navbar,Exchanges,Homepage,Cryptocurrencies,News,CryptoDetails} from './components';
import 'antd/dist/reset.css'
import i18next from '../src/i18n/index';
import { useTranslation } from 'react-i18next';
const WHITE = 'white';
const CENTER = 'center';
function App() {
  const {t} = useTranslation();
  return (
    
    <div className='app'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='main'>
          <Layout>
            <div className='routes'>
              <Routes>
                <Route path='/' element={<Homepage/>}>
                </Route>
                <Route path='/exchanges' element={<Exchanges/>}>
                </Route>
                <Route path='/cryptocurrencies' element={<Cryptocurrencies/>}>
                </Route>
                <Route path='/crypto/:coinId' element={<CryptoDetails/>}>
                </Route>
                <Route path='/news' element={<News/>}>
                </Route>
              </Routes>
            </div>
          </Layout>
        
        <div className='footer' level={3}>
          <Typography.Title style={{color: WHITE,textAlign:CENTER,fontSize:'20px' }}>
            CryptoBrowser<br/>
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>{t('News')}</Link>
          </Space>
        </div>  

        </div>      
    </div>

  )
}

export default App