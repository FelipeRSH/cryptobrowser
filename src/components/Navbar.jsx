import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography } from 'antd'
import { Link } from "react-router-dom"
import {
    HomeOutlined, MoneyCollectOutlined, BulbOutlined
    , FundOutlined, MenuOutlined
} from '@ant-design/icons'
import icon from '../images/cryptocurrency.png';
import { useTranslation } from 'react-i18next';
import brazilFlag from '../images/brazil.png';
import usFlag from '../images/us.png';
function Navbar() {
    const { t } = useTranslation();
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);
    const menuItems = [

        {
            key: '/home',
            icon: <HomeOutlined />,
            label: 'Homepage',
            path: '/',
        },
        {
            key: 'cryptos',
            icon: <MoneyCollectOutlined />,
            label: t('Cryptocurrencies'),
            path: '/cryptocurrencies',

        },
        {
            key: 'exchanges',
            icon: <FundOutlined />,
            label: 'Exchanges',
            path: '/exchanges'
        },
        {
            key: 'news',
            icon: <BulbOutlined />,
            label: t('News'),
            path: '/news'
        },
    ];
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        }
        else {
            setActiveMenu(true);
        }
    }, [screenSize]);
    return (
        <div className='nav-container'>

            <div className="logo-container">
                <img alt='logo' src={icon} size='large' width='85px' />
                <Typography.Title level={2} className='logo'>
                    <Link to="/">{t('CryptoBrowser')}</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined></MenuOutlined>
                </Button>
            </div>
            {activeMenu &&
                (<Menu theme='dark'>
                    {menuItems.map(item => (<Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.path}>{item.label}</Link>
                    </Menu.Item>))}
                    <div className='flags'>
                        <button style={{ background: 'none', border: 'none' }}>
                            <img src={usFlag} width={'40'} height={'35'} alt='English' />
                        </button>
                        <button style={{ background: 'none', border: 'none' }}>
                            <img src={brazilFlag} width={'40'} height={'35'} alt='Portuguese' />
                        </button>
                    </div>
                </Menu>)
            }

        </div>

    )
}

export default Navbar