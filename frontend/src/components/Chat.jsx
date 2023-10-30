import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes';
import useAuth from '../hooks/index.js';

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
};

export default Chat;
