import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannerInfo from '../components/ChannerInfo';
import RelatedVideos from '../components/RelatedVideos';

export default function VideoDetail() {
  const {
    state: { video },
  } = useLocation();

  console.log(`http://www.youtube.com/embed/${video.id}`);
  const { title, channelId, channelTitle, description } = video.snippet;
  return (
    <section className="flex flex-col lg:flex-row">
      <article className="basis-4/6">
        <iframe
          title={title}
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`http://www.youtube.com/embed/${video.id}`}
          frameborder="0"
        />
        <div className="p-8">
          <h2>{title}</h2>
          <ChannerInfo id={channelId} name={channelTitle} />
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      </article>
      <section className="basis-2/6">
        <RelatedVideos id={channelId} />
      </section>
    </section>
  );
}
