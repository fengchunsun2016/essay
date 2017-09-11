/**
 * Created by lihejia on 2017/7/22.
 */
import React from 'react';
import {Input} from 'antd';

const Search = Input.Search;

//搜索
export default ({onSearch,title}) => {
  return (
    <div className="search">
      {
        title?<Search
          defaultValue={title}
          style={{width: '40%', marginLeft: '30%', marginTop: '25px', height: '40px'}}
          onSearch={value =>onSearch(value)}
        />:<Search
          placeholder="请输入您要搜索的内容"
          style={{width: '40%', marginLeft: '30%', marginTop: '25px', height: '40px'}}
          onSearch={value =>onSearch(value)}
        />
      }


      <style jsx>{`
         .search{
              position:relative;
              height:70px;
              background-size:100% 100%;
         }
        `}</style>
    </div>
  )
}