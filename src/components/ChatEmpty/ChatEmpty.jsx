import React from 'react';
import StartMes from '../StartMess/StartMes'
import { Row } from 'antd';
function ChatEmpty(props) {
    return (
        <Row className="chat_empty" style={{width: '100%', height: '100%'}}>
           <StartMes />
        </Row>
    );
}

export default ChatEmpty;