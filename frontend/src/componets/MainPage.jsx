import { Spinner } from 'react-bootstrap';
import Channels from './Channels';
import Chat from './Chat';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { useGetMessagesQuery } from '../services/messagesApi.js';
import Modal from './Modal.jsx';

const MainPage = () => {
  const { isLoading: isChannelsLoading } = useGetChannelsQuery();
  const { isLoading: isMessagesLoading } = useGetMessagesQuery();

  return isChannelsLoading || isMessagesLoading
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Загрузка</span>
        </Spinner>
      </div>

    )
    : (
      <>
        <Modal />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <Channels />
            </div>
            <div className="col p-0 h-100">
              <Chat />
            </div>
          </div>
        </div>
      </>
    );
};

export default MainPage;
