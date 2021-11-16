import { Col, Layout, Row } from 'antd';
import MyHeader from '../../components/header/Header';
import { observer } from 'mobx-react-lite';
import { Switch, Route } from 'react-router-dom';
import { useStore } from '../../hook';
import Conversation from '../../components/conversation/Conversation';
import ChatEmpty from '../../components/ChatEmpty/ChatEmpty';
import ContrainerMess from '../../components/ContainerMess/ContrainerMess';
import './messenger.css';

const Messenger = observer(() => {
  const AuthStore = useStore('AuthStore');
  const { Sider, Content, Header } = Layout;

  return (
    <Layout className="app">
      <Sider>
        <MyHeader />
      </Sider>
      <Layout className="app-grid">
        <Header>{`Wilina-${AuthStore.user?.username}`}</Header>
        <Content>
          <Row className="container" gutter={0}>
            <Col span={6}>
              <Conversation />
            </Col>
            <Col span={18} className="container_chat_main">
              <Switch>
                <Route path="/messenger" exact component={ChatEmpty} />
                <Route path="/messenger/:conversationId" exact component={ContrainerMess}/>
              </Switch>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
});

export default Messenger;
