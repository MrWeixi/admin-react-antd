import React,{useEffect} from 'react'
import { Spin } from 'antd'
import NProgress from 'nprogress'
import "nprogress/nprogress.css"
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const Loading = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="app-container">
      <Spin />
    </div>
  );
};

export default Loading;