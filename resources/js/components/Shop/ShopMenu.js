import React, { useState, useEffect } from 'react';
import { Drawer } from "antd";

const ShopMenu = (props) => {
    const [shopDrawer, setShopDrawer] = useState(false);
    const [titles, setTitles] = useState(null);

    useEffect(() => {
        axios.get('/api/titles')
            .then(response => {
                setTitles(response.data.titles)
            })
    }, [])

    const showDrawer = () => {
        setShopDrawer(!shopDrawer);
    };


    const ShopItems = () => {
        return (
            <React.Fragment>
                {titles.map(title => <p key={title.title}>
                    <div className="shop-titles">
                        <span className="title-title">{title.title}</span>
                        <span className="title-price">{title.price} <img style={{ width: 20, paddingRight: 2, paddingBottom: 2}} src="/images/credits.png" alt="credits"/> </span>
                    </div>
                </p>)}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <a onClick={showDrawer} target="_blank">
                <span><strong>{props.credits}</strong></span>

                <div className="shopping-cart">
                    <img src="\images\open.svg" alt="" />
                </div>
            </a>

            <Drawer
                title={`Windesheim Shop 🛒 \n Credits: ${props.credits}`}
                placement="right"
                closable={false}
                onClose={showDrawer}
                visible={shopDrawer}
            >
                <div>
                    <ShopItems />
                </div>
            </Drawer>
        </React.Fragment>
    );
}

export default ShopMenu;