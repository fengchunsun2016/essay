/**
 * 公用的head
 * Created by lihejia on 2017/7/18.
 */
import React from 'react';
import Head from 'next/head';
import config from '../../config/config.json';

export default ({title}) => {
  return (
    <Head>
      <title>{title ? title : config.projectName}</title>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
      <link rel="stylesheet" href="/static/antd.min.css" />
    </Head>
  )
}