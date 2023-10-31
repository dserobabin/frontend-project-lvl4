import { useSelector } from 'react-redux';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const ChatBox = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const channels = useSelector(channelsSelectors.selectAll);
  const { currentChannelId } = useSelector((state) => state.currentChannel);
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const currentChannelName = currentChannel === undefined ? 'no value' : currentChannel.name;
  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelName}`}</b>
        </p>
        <span className="text-muted">{`${currentMessages.length} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages.map(({ id, username, body }) => (
          <Message
            key={id}
            username={username}
            body={body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        Form
      </div>

    </div>
  );
};

export default ChatBox;
