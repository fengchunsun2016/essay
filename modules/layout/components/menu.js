import React from 'react';
import {Menu, Icon} from 'antd';
import Link from 'next/link';

/**
 * 左侧菜单
 * @param url
 * @param menus
 * @returns {XML}
 */
export default ({url, menus = []}) => {
  let {pathname} = url;
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/main/index']} selectedKeys={[pathname]}>

      {
        menus.map((item) => {
          return (
            <Menu.Item key={item.path} style={{height: '56px', lineHeight: '56px'}}>
              <Link href={item.path}>
                <a>
                  <Icon type={item.icon} />
                  <span className="nav-text">{item.title}</span>
                </a>
              </Link>
            </Menu.Item>
          )
        })
      }

    </Menu>

  )

}
