import { Col, Layout, Row, Switch } from 'antd';
import MyHeader from '../../components/header/Header';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { useStore } from '../../hook';
import Conversation from '../../components/conversation/Conversation';
import './messenger.css';

const Messenger = observer(() => {
  const AuthStore = useStore('AuthStore');
  const {Sider, Header,Content} = Layout;
  return (
    <Layout className="app">
      <Sider>
        <MyHeader />
      </Sider>
      <Layout className="app-grid">
        <Header>{`Wilina-${AuthStore.user?.username}`}</Header>
        <Content>
          <Row className="container" gutter={0}>
            <Col span={6}><Conversation /></Col>
            <Col span={18} className="container_chat_main">
              <Switch>
                {/* <Route path="/messenger" exact component={ChatEmpty}/>
                    <Route path="/messenger/:conversationId" exact component={ContrainerMess}/> */}
              </Switch>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
});

export default Messenger;
