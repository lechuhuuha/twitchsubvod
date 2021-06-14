import React, { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import api from '../../services/api';

import { Container, AnimationContainer } from './styles';
import VodGallery from '../../components/VodGallery';
import LinkBox from '../../components/LinkBox';
import Footer from '../../components/Footer';
import QualitySelection from '../../components/QualitySelection';
import ErrorModal from '../../components/ErrorModal';
import LoadingModal from '../../components/LoadingModal';
import SearchSelection from '../../components/searchSelection';
import initLocalStorage, { getLocalStorage } from '../../services/localStorage';
import SavedSearched from '../../components/savedSearched';

interface TwitchVideoProps {
  videos: Array<{
    broadcast_id: number;
    channel: {
      display_name: string;
      description: string;
      followers: number;
      logo: string;
      video_banner: string;
    };
    thumbnails: {
      large: Array<{ url: string }>;
    };
  }>;
}

const Home: React.FC = (props: any) => {
  const [username, setUsername] = useState('');
  const [twitchData, setTwitchData] = useState<TwitchVideoProps>();
  const [quality, setQuality] = useState('chunked');
  const [searchType, setSearchType] = useState('chunked');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // ajax user data when start typing
  useEffect(() => {
    if (username) {
      api
        .get(`search/channels?query=${username}&sort=views`)
        .then((resp) => {
          // console.log(resp.data.channels);
          // setChannelData(resp.data.channels);
          appendDatalist(resp.data.channels);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username]);
  // channel data list
  function appendDatalist(channelData: Array<any>) {
    const dataList: any = document.querySelector('#streamer-username');
    // console.log(channelData);
    let option = channelData
      .map((item: any) => {
        // console.log(item.display_name);
        return `<option value="${item.display_name}">${item.display_name}</option>`;
      })
      .join(' ');
    // console.log(option);
    dataList.innerHTML = option;
  }


  let [userStorage, setUserStorage] = useState(false);
  useEffect(() => {
    if (userStorage) {
      props.update();
      setUserStorage(false);
    }
  }, [userStorage]);

  // const [selectedVal, setSelectedVal] = useState(props.selectedVal); deprecated
  useEffect(() => {
    // setSelectedVal(props.selectedVal);
    setUsername(props.selectedVal);
  }, [props.selectedVal]);
  // handle submit

  const handleSubmit = () => {
    if (username) {
      setLoading(true);
      try {
        setError('');
        api.get(`users?login=${username}`).then((response) => {
          initLocalStorage(username);
          const addStreamers = async (item: any) => {
            await fetch('http://localhost:3002/streamers', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',

              },
              body: JSON.stringify(item)
            })
          }
          let streamers = {
            id: response.data.users[0]._id,
            bio: response.data.users[0].bio,
            display_name: response.data.users[0].display_name,
            logo: response.data.users[0].logo,
            name: response.data.users[0].name,
            type: response.data.users[0].type,
            created_at: response.data.users[0].created_at,
            updated_at: response.data.users[0].updated_at
          }
          // console.log(streamers)
          addStreamers(streamers)
          // console.log(response.data.users[0]);
          // console.log(response.data.users[0]._id, 'user id');
          setUserStorage(true);
          try {
            api
              .get(`channels/${response.data.users[0]._id}/videos?limit=100`)
              .then((channelResponse: any) => {
                console.log(channelResponse.data.videos, 'chanel response');
                const addCategory = async (item: any) => {
                  await fetch('http://localhost:3002/video', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                  });
                };
                channelResponse.data.videos.map((item: any) => {
                  let newsItem = {
                    streamersId: response.data.users[0]._id,
                    title: item.title,
                    views: item.views,
                    url: item.url,
                    created_at: item.created_at,
                    published_at: item.published_at,
                    delete_at: item.delete_at,
                    recorded_at: item.recorded_at,
                    game: item.game,
                    thumbnails: item.thumbnails.medium.url,
                  };
                  addCategory(newsItem);
                });
                channelResponse.data.videos.length !== 0 &&
                  setTwitchData(channelResponse.data);
                setLoading(false);
                // console.log(channelResponse.data._total, 'total video');
                if (channelResponse.data._total === 0) {
                  setError(`${username} does not have any available streams`);
                  setLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            setError('This user does not exist or is unavailable');
            setLoading(false);
          }
        });
      } catch (err) {
        console.warn(err);
        setLoading(false);
        setError('Something went wrong');
      }

      // (quality || twitchData) && console.log(quality, twitchData);
    } else {
      setError('Enter a streamer username');
    }
  };

  useEffect(() => {
    console.log(searchType);
  }, [searchType]);
  // console.clear();
  return (
    <Container>
      <AnimationContainer>
        <h1>Twitch Sub Vod</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            name="username"
            id="username"
            aria-label="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            placeholder="Streamer Username"
            list="streamer-username"
            autoComplete="off"
          />
          <datalist id="streamer-username"></datalist>
          {/* <QualitySelection
            onChange={(event: any) => setQuality(event.target.value)}
          /> */}
          {/* <SearchSelection
            onChange={(e: any) => {
              setSearchType(e.target.value);
            }}
          /> */}
          <button type="submit" aria-label="submit" onClick={handleSubmit}>
            <FiSearch size={14} />
            Search
          </button>
        </form>

        {error && <ErrorModal message={error} />}

        {/* <LinkBox clips />
        <LinkBox vods />
        <LinkBox download /> */}

        {loading && <LoadingModal />}

        {twitchData && !error && (
          <>
            <VodGallery
              data={twitchData.videos}
              quality={quality === 'Source' ? 'chunked' : quality}
            />
          </>
        )}
      </AnimationContainer>
      <Footer />
    </Container>
  );
};

export default Home;
