import { useState, useRef } from 'react';
import { routes } from '../../constants/routes';
import './conversation.css';
import { useStore } from '../../hook';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { sortConversationByUpdateAt } from '../../helper/functions';
// import ProfileRight from '../ProfileRight/ProfileRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faSearch,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
// import SearchFriend from '../searchFriend/search'
import { Modal, Tooltip } from 'antd';
import { PersonAdd, GroupAdd } from '@material-ui/icons';
import { socketEvents } from '../../constants/configValues';

library.add(faSearch, faArrowLeft, faUsers);

const Conversation = observer(() => {
  const ActionStore = useStore('ActionStore');
  const AuthStore = useStore('AuthStore');
  const conversations = sortConversationByUpdateAt(ActionStore.conversations);
  const history = useHistory();
  const [actionSearchPeple, setActionSearchPeople] = useState(false);
  const [showModalGroup, setShowModalGroup] = useState(false);
  const [modalSearchList, setModalSearchList] = useState([]);
  const createNameGroup = useRef(null);

  const handleCancelGroup = () => {
    setShowModalGroup(false);
  };

  const handleSearchPeople = (e) => {
    setActionSearchPeople(true);
    ActionStore.action_searchFriend(e.target.value);
  };

  const handleEndSearch = () => {
    ActionStore.action_resetListSearchFriend();
    setActionSearchPeople(false);
  };

  const handlePassPage = (conversation) => {
    history.push(routes.MESSENGER_ID(conversation._id));
  };

  const handleNewConversation = async (user) => {
    const result = await ActionStore.action_getCovBySearch(
      AuthStore?.user._id,
      user?._id
    );
    setActionSearchPeople(false);
    history.push(routes.MESSENGER_ID(result._id));
  };

  // > UI parts
  const modalGroup = (isModalVisible) => {
    const handleInviteGroup = (e, userId) => {
      // TODO: logic backend: directly add to group
      AuthStore.socket.emit(socketEvents.INVITE_TO_GROUP, {
        from: AuthStore.user,
        to: userId,
      });
    };
    return (
      <Modal
        title="Tạo nhóm"
        visible={isModalVisible}
        onCancel={handleCancelGroup}
        className="modal-group">
        <div className="main-modal_showGroup">
          <div className="main-modal_showGroup-search">
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" />
          </div>
          <span>Bạn bè</span>
          <div className="main-modal_showGroup-row">
            {modalSearchList.map((value) => {
              return (
                <div className="main-modal_showGroup-col">
                  <div className="main-modal_showGroup-col-info">
                    <img
                      src={value.profilePicture}
                      className="main-modal_showGroup-col-img"
                      alt="profilePicture"
                    />
                    <span>{value.username}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      handleInviteGroup(e, value._id);
                    }}>
                    Mời vào nhóm
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  };
  // < UI parts

  return (
    <div className="container-left">
      <div className="container-left__head">
        <div className="container-left__head-top">
          <div className="container-left__head-top-title">
            <div className="container-left__head-search">
              <div className="container-left__search-box">
                <div className="container-left__search-box-icon">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={actionSearchPeple ? 'hidden_icon' : ''}
                  />
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={!actionSearchPeple ? 'hidden_icon' : ''}
                    onClick={handleEndSearch}
                  />
                </div>
                <input
                  type="text"
                  className="container-left__search-box-input"
                  placeholder="Tìm kiếm trên Messenger"
                  onChange={(e) => handleSearchPeople(e)}
                />
              </div>
            </div>
          </div>

          <div className="container-left__head-top-group">
            <div className="container-left__head-group-btn" onClick={() => {}}>
              <Tooltip title="Thêm bạn" overlayStyle={{ color: 'black' }}>
                <PersonAdd />
              </Tooltip>
            </div>
            <div
              className="container-left__head-group-btn"
              onClick={async () => {
                // getListModalGroup();
                setShowModalGroup(true);
              }}>
              <Tooltip title="Tạo nhóm" overlayStyle={{ color: 'black' }}>
                <GroupAdd />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="container-left__body">
        <ul className="container-left__list">
          {actionSearchPeple ? (
            _.isEmpty(ActionStore.listSearch) ? (
              <>
                {' '}
                <span>Không tìm thấy kết quả phù hợp</span>{' '}
              </>
            ) : (
              ActionStore.listSearch.map((user) => (
                <div
                // onClick={() => handlenewConversation(user)}
                >
                  {/* <SearchFriend user={user} /> */}
                </div>
              ))
            )
          ) : (
            conversations.map((conversation, index) => {
              return (
                <>
                  <li
                    className="container-left__item"
                    onClick={async () => {
                      // currentConversation.current = conversation?._id
                      // await handlePassPage(conversation);
                      // beforeConversation.current = conversation?._id;
                    }}>
                    {/* <ProfileRight 
                                        conversation={conversation} 
                                        seen={conversation.lastText?.seens.filter(value => value.id == AuthStore.user._id)}
                                        isGroup={_.size(conversation.members) > 2? true:false}
                                        
                                        /> */}
                  </li>
                </>
              );
            })
          )}
        </ul>
      </div>
      {modalGroup(showModalGroup)}
    </div>
  );
});

export default Conversation;
