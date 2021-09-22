import React from 'react';
import { Link } from 'react-router-dom';
import {Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

function LeftMenu({mode}) {
    return (
        <Menu mode={mode}>
            <MenuItem key="home">
                <Link to="/">Home</Link>
            </MenuItem>
            <SubMenu title={<span>Blogs</span>} key="blogs">
                <MenuItemGroup title="Item 1">
                    <MenuItem key="setting:1">Option 1</MenuItem>
                    <MenuItem key="setting:2">Option 2</MenuItem>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                    <MenuItem key="setting:3">Option 3</MenuItem>
                    <MenuItem key="setting:4">Option 4</MenuItem>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    )
}

export default LeftMenu
