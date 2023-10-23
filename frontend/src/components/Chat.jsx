import axios from 'axios';
import { useEffect } from 'react';
import routes from '../routes';
import useAuth from '../hooks/index.js';

const Chat = () => {
  console.log('hi');
  const auth = useAuth();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        console.log(data);
      } catch (err) {
        console.log('error');
      }
    };
    fetchContent();
  });
};

export default Chat;
