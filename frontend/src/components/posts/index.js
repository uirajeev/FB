import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import useCssRootColor from '../../hooks/useCssRootColor';
import { Dots, Public } from '../../svg'
import fetchData from '../../helpers/fetchData';
import BaseCard from '../baseCard';

import './style.scss';

const Posts = ({ user }) => {
  const { t } = useTranslation();
  const publicColor = useCssRootColor('--cool-gray');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    const { success, data, error } = await fetchData('/post/all', 'GET', null, {
      Authorization: `Bearer ${user.token}`,
    });

    if (success) {
      setPosts(data);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <BaseCard key={post._id}>
          <div className='post'>
            <div className='post__header'>
              <Link
                to={`/profile/${post.user.username}`}
                className='post__header__left'
              >
                <img src={post.user.picture} alt={post.user.username} />
                <div className='post__header__col'>
                  <div className='post__header__profile'>
                    {`${post.user.first_name} ${post.user.last_name}`}
                    <div className='post__header__updated'>
                      {post.type &&
                        t('post.update', {
                          gender: t(`post.${post.user.gender}`),
                          type: t(`post.${post.type}`),
                        })}
                    </div>
                  </div>
                  <div className='post__header__date'>
                    <Moment fromNow interval={30}>{post.createdAt}</Moment>
                    <Public color={publicColor} />
                  </div>
                </div>
              </Link>
              <div className="post__header__right hover1">
                <Dots color={publicColor} />
              </div>
            </div>
          </div>
        </BaseCard>
      ))}
    </div>
  );
};

export default Posts;
