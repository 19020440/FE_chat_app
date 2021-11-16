import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { Row, Col, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../hook';
import { routes } from '../../constants/routes';

import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faGamepad,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import { countTextNotSeen } from '../../helper/functions';
import { socketEvents } from '../../constants/configValues';
import './header.css';
library.add(faSignOutAlt, faGamepad, faFacebookMessenger, faBell);

const Header = observer((props) => {
  const AuthStore = useStore('AuthStore');
  const ActionStore = useStore('ActionStore');
  const history = useHistory();

  const { user } = AuthStore;
  const countMess = countTextNotSeen(
    ActionStore.conversations,
    AuthStore.user?._id
  );
  const [visible, setVisible] = useState(false);

  const redirectToProfile = (e) => {
    history.push(routes.PROFILE_ID(AuthStore.user?._id));
  };

  const redirectToMessenger = (e) => {
    history.push(routes.MESSENGER);
  };

  const handleLogout = async () => {
    // STEP1: logout
    await AuthStore.action_logout();

    // STEP2: create event
    if (!_.isEmpty(AuthStore.socket)) {
      AuthStore.socket.emit(socketEvents.USER_OFFLINE, {
        userId: AuthStore.user._id,
        arrCov: ActionStore.conversations,
      });
    }

    setVisible(false);
  };

  const handleCancel = () => setVisible(false);

  const showModal = () => setVisible(true);

  return (
    <>
      <div className="sideBar-chat">
        <Row>
          <Col
            span={24}
            className="sideBar-info-img"
            onClick={redirectToProfile}>
            <img src={user?.profilePicture} alt="profilePicture" />
          </Col>
          <Col
            span={24}
            className="sideBar-conversation sideBar-active-class"
            onClick={redirectToMessenger}>
            <FontAwesomeIcon icon={faFacebookMessenger} />
            {countMess !== 0 && <span>{countMess}</span>}
          </Col>

          <Col span={24} className="sideBar-game">
            <FontAwesomeIcon icon={faGamepad} />
          </Col>
          <Col span={24} className="sideBar-Notify">
            <FontAwesomeIcon icon={faBell} />
          </Col>
          <Col span={24} className="sideBar-logOut" onClick={showModal}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Col>
        </Row>
      </div>

      <Modal
        title="Bạn có chắc muốn thoát!"
        visible={visible}
        onOk={handleLogout}
        onCancel={handleCancel}
      />
    </>
  );
});

export default Header;
