import React from 'react';
import {Spin} from 'antd';

const Loading = (props)  => {
    return (
        <Spin Loading={props.isLoading} className="loading_component"/>
    );
}

export default Loading;