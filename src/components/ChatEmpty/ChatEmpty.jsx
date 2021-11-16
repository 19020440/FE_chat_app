import React from 'react';
import WelcomePage from '../WelcomePage/WelcomePage';
import './chatEmpty.css';
import { Row } from 'antd';

function ChatEmpty(props) {
  return (
    <Row className="chat_empty">
      <WelcomePage />
    </Row>
  );
}

export default ChatEmpty;
