import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes';
import useAuth from '../hooks/index.js';
import ChatBox from './ChatBox';
import ChannelsBox from './ChannelsBox';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currentchannelActions } from '../slices/currentChannelSlice.js';

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        console.log(data);
        dispatch(channelsActions.addChannels(data.channels));
        dispatch(messagesActions.addMessages(data.messages));
        dispatch(currentchannelActions.changeCurrentChannelId(data.currentChannelId));
      } catch (err) {
        console.log('error');
      }
    };
    fetchContent();
  }, [auth, dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsBox />
        </div>
        <div className="col p-0 h-100">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Chat;
