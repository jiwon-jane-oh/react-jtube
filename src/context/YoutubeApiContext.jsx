import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
// import FakeYoutubeClient from '../api/fakeYoutubeClient';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
  // const client = new FakeYoutubeClient();
  const client = new YoutubeClient();
  const youtube = new Youtube(client);

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
