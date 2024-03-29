import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm.jsx';

import { useGetMessagesQuery } from '../services/messagesApi.js';
import { useGetChannelsQuery } from '../services/channelsApi.js';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const Chat = () => {
  const { data: messages } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();
  const { currentChannelId } = useSelector((state) => state.currentChannel);
  const currentChannel = channels.find((el) => el.id === currentChannelId);
  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel.name}`}</b>
        </p>
        <span className="text-muted">
          {`${currentMessages.length} ${t('chat.messageCount', { count: currentMessages.length })}`}
        </span>
      </div>
      <div id="messages" className="chat-messages overflow-auto px-5">
        {currentMessages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default Chat;
